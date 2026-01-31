const MAX_WIDTH = 800;
const MAX_HEIGHT = 600;
const JPEG_QUALITY = 0.7;

async function compressImage(dataUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      let width = img.width;
      let height = img.height;
      
      const aspectRatio = width / height;
      
      if (width > MAX_WIDTH) {
        width = MAX_WIDTH;
        height = Math.round(width / aspectRatio);
      }
      
      if (height > MAX_HEIGHT) {
        height = MAX_HEIGHT;
        width = Math.round(height * aspectRatio);
      }
      
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      
      ctx.drawImage(img, 0, 0, width, height);
      
      const compressedUrl = canvas.toDataURL('image/jpeg', JPEG_QUALITY);
      console.log(`Image compressed: ${Math.round(dataUrl.length / 1024)}KB -> ${Math.round(compressedUrl.length / 1024)}KB`);
      resolve(compressedUrl);
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = dataUrl;
  });
}

async function getApiUrl() {
  const result = await browser.storage.sync.get(["apiUrl"]);
  return result.apiUrl || "http://localhost:5000";
}

async function setApiUrl(url) {
  await browser.storage.sync.set({ apiUrl: url });
}

browser.commands.onCommand.addListener(async (command) => {
  if (command === "capture-and-analyze") {
    await captureAndAnalyze();
  }
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "captureAndAnalyze") {
    captureAndAnalyze().then(sendResponse);
    return true;
  }
  if (request.action === "getApiUrl") {
    getApiUrl().then(url => sendResponse({ apiUrl: url }));
    return true;
  }
  if (request.action === "setApiUrl") {
    setApiUrl(request.url).then(() => sendResponse({ success: true }));
    return true;
  }
  if (request.action === "getErrorCount") {
    browser.storage.local.get(["errorLogs"]).then(result => {
      sendResponse({ count: (result.errorLogs || []).length });
    });
    return true;
  }
});

async function captureAndAnalyze() {
  let tabId = null;
  
  try {
    const apiUrl = await getApiUrl();
    console.log("Using API URL:", apiUrl);
    
    if (!apiUrl) {
      throw new Error("Please set the API URL in settings");
    }
    
    if (!apiUrl.startsWith("http://") && !apiUrl.startsWith("https://")) {
      throw new Error("API URL must start with http:// or https://");
    }

    const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    
    if (!tab || !tab.id) {
      throw new Error("No active tab found");
    }
    
    tabId = tab.id;
    
    await injectContentScriptIfNeeded(tabId);
    await sendToContentScript(tabId, { action: "showLoading" });

    const rawScreenshot = await browser.tabs.captureVisibleTab(null, {
      format: "png"
    });
    
    console.log("Raw screenshot size:", Math.round(rawScreenshot.length / 1024), "KB");
    
    let screenshotDataUrl;
    try {
      screenshotDataUrl = await compressImage(rawScreenshot);
    } catch (e) {
      console.warn("Compression failed, using original:", e);
      screenshotDataUrl = rawScreenshot;
    }

    const fullUrl = `${apiUrl}/api/analyze`;
    console.log("Sending request to:", fullUrl);
    console.log("Compressed screenshot size:", Math.round(screenshotDataUrl.length / 1024), "KB");
    
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ image: screenshotDataUrl })
    });
    
    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.log("Error response:", errorData);
      
      let errorMessage = "Analysis failed";
      
      if (response.status === 413) {
        errorMessage = "Screenshot too large";
      } else if (response.status === 429) {
        errorMessage = "Too many requests - please wait";
      } else if (errorData.error) {
        errorMessage = errorData.error;
        if (errorData.debug) {
          console.log("Debug info from server:", errorData.debug);
        }
      } else if (response.status >= 500) {
        errorMessage = "Server error - please try again later";
      }
      
      throw new Error(errorMessage);
    }

    const analysis = await response.json();

    await sendToContentScript(tabId, { 
      action: "showResult", 
      analysis 
    });

    return analysis;

  } catch (error) {
    console.error("Capture error:", error);
    
    const errorMsg = error.message || "Error during analysis";
    console.log("Error message to show:", errorMsg);
    
    await logError(error, "captureAndAnalyze");
    
    if (tabId) {
      try {
        await sendToContentScript(tabId, { 
          action: "showError", 
          message: errorMsg
        });
      } catch (e) {
        console.error("Error showing error message:", e);
      }
    }
    
    showNotification("Error", errorMsg);
    
    return { error: errorMsg };
  }
}

function showNotification(title, message) {
  browser.notifications.create({
    type: "basic",
    iconUrl: "icons/icon128.png",
    title: `Poker Coach: ${title}`,
    message: message.length > 100 ? message.substring(0, 100) + "..." : message
  });
}

async function logError(error, context = "") {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    context,
    error: error.toString(),
    stack: error.stack || ""
  };
  
  const result = await browser.storage.local.get(["errorLogs"]);
  const logs = result.errorLogs || [];
  
  logs.push(logEntry);
  if (logs.length > 50) logs.shift();
  
  await browser.storage.local.set({ errorLogs: logs });
  console.log("Error logged:", logEntry);
}

async function injectContentScriptIfNeeded(tabId) {
  try {
    await browser.tabs.sendMessage(tabId, { action: "ping" });
  } catch (error) {
    await browser.scripting.executeScript({
      target: { tabId },
      files: ["content.js"]
    });
    await browser.scripting.insertCSS({
      target: { tabId },
      files: ["overlay.css"]
    });
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

async function sendToContentScript(tabId, message) {
  return browser.tabs.sendMessage(tabId, message);
}
