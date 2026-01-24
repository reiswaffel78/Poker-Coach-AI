let overlayContainer = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.action) {
    case "ping":
      sendResponse({ success: true });
      return true;
    case "showLoading":
      showOverlay(createLoadingContent());
      break;
    case "showResult":
      showOverlay(createResultContent(request.analysis));
      break;
    case "showError":
      showOverlay(createErrorContent(request.message));
      break;
    case "hideOverlay":
      hideOverlay();
      break;
  }
  sendResponse({ success: true });
  return true;
});

function showOverlay(content) {
  hideOverlay();
  
  overlayContainer = document.createElement("div");
  overlayContainer.id = "poker-coach-overlay";
  overlayContainer.innerHTML = content;
  
  // Prevent page from removing our overlay
  overlayContainer.style.cssText = `
    position: fixed !important;
    top: 20px !important;
    right: 20px !important;
    z-index: 2147483647 !important;
    display: block !important;
    visibility: visible !important;
  `;
  
  document.body.appendChild(overlayContainer);
  
  const closeBtns = overlayContainer.querySelectorAll(".poker-coach-close");
  closeBtns.forEach(btn => {
    btn.addEventListener("click", hideOverlay);
  });
  
  setTimeout(() => {
    if (overlayContainer) {
      overlayContainer.classList.add("poker-coach-visible");
    }
  }, 10);
}

function hideOverlay() {
  if (overlayContainer) {
    overlayContainer.classList.remove("poker-coach-visible");
    setTimeout(() => {
      overlayContainer?.remove();
      overlayContainer = null;
    }, 200);
  }
}

function createLoadingContent() {
  return `
    <div class="poker-coach-card">
      <div class="poker-coach-header">
        <div class="poker-coach-logo">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C9.24 2 7 4.24 7 7c0 2.85 2.92 7.21 5 9.88 2.11-2.69 5-7 5-9.88 0-2.76-2.24-5-5-5zm0 7.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
          </svg>
        </div>
        <span class="poker-coach-title">Poker Coach</span>
      </div>
      <div class="poker-coach-content">
        <div class="poker-coach-spinner"></div>
        <p class="poker-coach-loading-text">Analysiere Screenshot...</p>
        <p class="poker-coach-loading-subtext">KI erkennt Karten und Spielsituation</p>
      </div>
    </div>
  `;
}

function createResultContent(analysis) {
  const recommendationColors = {
    "FOLD": { bg: "#ef4444", text: "#fff" },
    "CHECK": { bg: "#6b7280", text: "#fff" },
    "CALL": { bg: "#22c55e", text: "#fff" },
    "RAISE": { bg: "#3b82f6", text: "#fff" },
    "ALL-IN": { bg: "#8b5cf6", text: "#fff" }
  };
  
  const colors = recommendationColors[analysis.recommendation] || { bg: "#22c55e", text: "#fff" };
  
  return `
    <div class="poker-coach-card">
      <div class="poker-coach-header">
        <div class="poker-coach-logo">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C9.24 2 7 4.24 7 7c0 2.85 2.92 7.21 5 9.88 2.11-2.69 5-7 5-9.88 0-2.76-2.24-5-5-5zm0 7.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
          </svg>
        </div>
        <span class="poker-coach-title">Poker Coach</span>
        <button class="poker-coach-close" aria-label="Schließen">&times;</button>
      </div>
      <div class="poker-coach-content">
        <div class="poker-coach-recommendation" style="background-color: ${colors.bg}; color: ${colors.text}">
          ${analysis.recommendation}
        </div>
        ${analysis.confidence ? `
          <div class="poker-coach-confidence">
            Konfidenz: ${analysis.confidence}%
          </div>
        ` : ""}
        ${analysis.heroCards ? `
          <div class="poker-coach-info">
            <strong>Deine Karten:</strong> ${analysis.heroCards}
          </div>
        ` : ""}
        ${analysis.communityCards ? `
          <div class="poker-coach-info">
            <strong>Board:</strong> ${analysis.communityCards}
          </div>
        ` : ""}
        ${analysis.position ? `
          <div class="poker-coach-info">
            <strong>Position:</strong> ${analysis.position}
          </div>
        ` : ""}
        <div class="poker-coach-reasoning">
          ${analysis.reasoning}
        </div>
      </div>
      <div class="poker-coach-footer">
        <button class="poker-coach-close poker-coach-btn">Schließen</button>
      </div>
    </div>
  `;
}

function createErrorContent(message) {
  // Clean up technical error messages
  let cleanMessage = message;
  if (message.length > 150 || message.includes("{") || message.includes("Error:")) {
    cleanMessage = "Analyse fehlgeschlagen - bitte erneut versuchen";
  }
  
  return `
    <div class="poker-coach-card poker-coach-error">
      <div class="poker-coach-header">
        <div class="poker-coach-logo poker-coach-logo-error">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
        </div>
        <span class="poker-coach-title">Fehler</span>
        <button class="poker-coach-close" aria-label="Schließen">&times;</button>
      </div>
      <div class="poker-coach-content">
        <p class="poker-coach-error-text">${cleanMessage}</p>
        <p class="poker-coach-error-hint">Drücke Ctrl+Shift+P um es erneut zu versuchen</p>
      </div>
      <div class="poker-coach-footer">
        <button class="poker-coach-close poker-coach-btn">Schließen</button>
      </div>
    </div>
  `;
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && overlayContainer) {
    hideOverlay();
  }
});
