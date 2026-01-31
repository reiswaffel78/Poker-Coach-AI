document.addEventListener("DOMContentLoaded", async () => {
  const analyzeBtn = document.getElementById("analyzeBtn");
  const statusDiv = document.getElementById("status");
  const resultDiv = document.getElementById("result");
  const apiUrlInput = document.getElementById("apiUrl");
  const saveBtn = document.getElementById("saveBtn");
  const connectionStatus = document.getElementById("connectionStatus");
  const errorLogSection = document.getElementById("errorLogSection");
  const errorCountSpan = document.getElementById("errorCount");
  
  const response = await browser.runtime.sendMessage({ action: "getApiUrl" });
  if (response && response.apiUrl) {
    apiUrlInput.value = response.apiUrl;
    checkConnection(response.apiUrl);
  }
  
  const errorResponse = await browser.runtime.sendMessage({ action: "getErrorCount" });
  if (errorResponse && errorResponse.count > 0) {
    errorLogSection.style.display = "block";
    errorCountSpan.textContent = errorResponse.count;
  }
  
  analyzeBtn.addEventListener("click", async () => {
    analyzeBtn.classList.add("loading");
    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spinning">
        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
      </svg>
      Analyzing...
    `;
    statusDiv.innerHTML = "";
    resultDiv.innerHTML = "";
    
    try {
      const response = await browser.runtime.sendMessage({ action: "captureAndAnalyze" });
      
      if (response && response.error) {
        showError(response.error);
      } else if (response && response.recommendation) {
        showResult(response);
      }
    } catch (error) {
      showError(error.message || "Error during analysis");
    } finally {
      resetButton();
    }
  });
  
  saveBtn.addEventListener("click", async () => {
    const url = apiUrlInput.value.trim();
    if (!url) {
      showError("Please enter a URL");
      return;
    }
    
    updateConnectionStatus("checking", "Saving...");
    
    await browser.runtime.sendMessage({ action: "setApiUrl", url });
    checkConnection(url);
  });
  
  apiUrlInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      saveBtn.click();
    }
  });
  
  async function checkConnection(url) {
    updateConnectionStatus("checking", "Checking connection...");
    
    try {
      const response = await fetch(`${url}/api/analyses`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      
      if (response.ok) {
        updateConnectionStatus("connected", "Connected");
      } else {
        updateConnectionStatus("disconnected", `Error: ${response.status}`);
      }
    } catch (error) {
      updateConnectionStatus("disconnected", "Not reachable");
    }
  }
  
  function updateConnectionStatus(status, text) {
    connectionStatus.innerHTML = `
      <div class="status-dot ${status}"></div>
      <span>${text}</span>
    `;
  }
  
  function resetButton() {
    analyzeBtn.classList.remove("loading");
    analyzeBtn.disabled = false;
    analyzeBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
        <circle cx="12" cy="13" r="4"/>
      </svg>
      Analyze Screenshot
    `;
  }
  
  function showResult(analysis) {
    const colors = {
      "FOLD": "#ef4444",
      "CHECK": "#6b7280",
      "CALL": "#22c55e",
      "RAISE": "#3b82f6",
      "ALL-IN": "#8b5cf6"
    };
    
    const bgColor = colors[analysis.recommendation] || "#22c55e";
    
    statusDiv.innerHTML = `<div class="status success">Analysis successful!</div>`;
    resultDiv.innerHTML = `
      <div class="result-preview">
        <div class="result-recommendation" style="background: ${bgColor}">
          ${analysis.recommendation}
        </div>
        ${analysis.heroCards ? `<div class="result-info">Cards: ${analysis.heroCards}</div>` : ""}
        ${analysis.confidence ? `<div class="result-info">Confidence: ${analysis.confidence}%</div>` : ""}
      </div>
    `;
  }
  
  function showError(message) {
    statusDiv.innerHTML = `<div class="status error">${message}</div>`;
    resultDiv.innerHTML = "";
  }
});

const style = document.createElement("style");
style.textContent = `
  .spinning {
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
