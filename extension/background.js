async function getApiUrl() {
  const result = await chrome.storage.sync.get(["apiUrl"]);
  return result.apiUrl || "http://localhost:5000";
}

async function setApiUrl(url) {
  await chrome.storage.sync.set({ apiUrl: url });
}

chrome.commands.onCommand.addListener(async (command) => {
  if (command === "capture-and-analyze") {
    await captureAndAnalyze();
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
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
  if (request.action === "downloadErrorLog") {
    downloadErrorLog().then(sendResponse);
    return true;
  }
  if (request.action === "getErrorCount") {
    chrome.storage.local.get(["errorLogs"]).then(result => {
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
      throw new Error("Bitte setze die API-URL in den Einstellungen");
    }
    
    // Validate URL format
    if (!apiUrl.startsWith("http://") && !apiUrl.startsWith("https://")) {
      throw new Error("API-URL muss mit http:// oder https:// beginnen");
    }

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab || !tab.id) {
      throw new Error("Kein aktiver Tab gefunden");
    }
    
    tabId = tab.id;
    
    await injectContentScriptIfNeeded(tabId);
    await sendToContentScript(tabId, { action: "showLoading" });

    const screenshotDataUrl = await chrome.tabs.captureVisibleTab(null, {
      format: "png",
      quality: 100
    });

    const fullUrl = `${apiUrl}/api/analyze`;
    console.log("Sending request to:", fullUrl);
    console.log("Screenshot size:", Math.round(screenshotDataUrl.length / 1024), "KB");
    
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
      let errorMessage = "Analyse fehlgeschlagen";
      
      if (response.status === 413) {
        errorMessage = "Screenshot zu groß";
      } else if (response.status === 429) {
        errorMessage = "Zu viele Anfragen - bitte warte kurz";
      } else if (response.status >= 500) {
        errorMessage = "Server-Fehler - bitte später erneut versuchen";
      } else if (errorData.error) {
        errorMessage = errorData.error.length > 100 
          ? "Analyse fehlgeschlagen - bitte erneut versuchen" 
          : errorData.error;
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
    
    const errorMsg = error.message || "Fehler bei der Analyse";
    console.log("Error message to show:", errorMsg);
    
    // Log error for later download
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
    
    // Always show notification as backup
    showNotification("Fehler", errorMsg);
    
    return { error: errorMsg };
  }
}

function showNotification(title, message) {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icons/icon128.png",
    title: `Poker Coach: ${title}`,
    message: message.length > 100 ? message.substring(0, 100) + "..." : message,
    priority: 2
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
  
  // Get existing logs
  const result = await chrome.storage.local.get(["errorLogs"]);
  const logs = result.errorLogs || [];
  
  // Add new log (keep last 50)
  logs.push(logEntry);
  if (logs.length > 50) logs.shift();
  
  await chrome.storage.local.set({ errorLogs: logs });
  console.log("Error logged:", logEntry);
}

async function downloadErrorLog() {
  try {
    const result = await chrome.storage.local.get(["errorLogs"]);
    const logs = result.errorLogs || [];
    
    if (logs.length === 0) {
      return { success: false, message: "Keine Fehler protokolliert" };
    }
    
    const logText = logs.map(log => 
      `[${log.timestamp}] ${log.context}\nFehler: ${log.error}\n${log.stack ? `Stack: ${log.stack}\n` : ""}---\n`
    ).join("\n");
    
    // Use data URL instead of blob URL for service worker compatibility
    const base64 = btoa(unescape(encodeURIComponent(logText)));
    const dataUrl = `data:text/plain;base64,${base64}`;
    
    await chrome.downloads.download({
      url: dataUrl,
      filename: `poker-coach-errors.log`,
      saveAs: true
    });
    
    return { success: true };
  } catch (e) {
    console.error("Download error:", e);
    return { success: false, message: e.message };
  }
}

async function injectContentScriptIfNeeded(tabId) {
  try {
    await chrome.tabs.sendMessage(tabId, { action: "ping" });
  } catch (error) {
    await chrome.scripting.executeScript({
      target: { tabId },
      files: ["content.js"]
    });
    await chrome.scripting.insertCSS({
      target: { tabId },
      files: ["overlay.css"]
    });
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

async function sendToContentScript(tabId, message) {
  return chrome.tabs.sendMessage(tabId, message);
}
