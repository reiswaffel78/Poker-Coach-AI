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
});

async function captureAndAnalyze() {
  let tabId = null;
  
  try {
    const apiUrl = await getApiUrl();
    
    if (!apiUrl) {
      throw new Error("Bitte setze die API-URL in den Einstellungen");
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

    const response = await fetch(`${apiUrl}/api/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ image: screenshotDataUrl })
    });

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
