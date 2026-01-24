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
  
  // Create overlay in a shadow DOM to prevent page interference
  overlayContainer = document.createElement("div");
  overlayContainer.id = "poker-coach-overlay-container";
  
  const shadow = overlayContainer.attachShadow({ mode: 'closed' });
  
  const style = document.createElement("style");
  style.textContent = getOverlayStyles();
  
  const wrapper = document.createElement("div");
  wrapper.id = "poker-coach-overlay";
  wrapper.innerHTML = content;
  
  shadow.appendChild(style);
  shadow.appendChild(wrapper);
  
  document.body.appendChild(overlayContainer);
  
  const closeBtns = shadow.querySelectorAll(".poker-coach-close");
  closeBtns.forEach(btn => {
    btn.addEventListener("click", hideOverlay);
  });
  
  // Make visible after a brief delay
  setTimeout(() => {
    wrapper.classList.add("poker-coach-visible");
  }, 50);
}

function getOverlayStyles() {
  return `
    #poker-coach-overlay {
      position: fixed !important;
      top: 20px !important;
      right: 20px !important;
      z-index: 2147483647 !important;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      opacity: 0;
      transform: translateX(20px);
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
    #poker-coach-overlay.poker-coach-visible {
      opacity: 1;
      transform: translateX(0);
    }
    .poker-coach-card {
      background: #1a1a2e;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
      width: 320px;
      max-width: calc(100vw - 40px);
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .poker-coach-header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 16px;
      background: linear-gradient(135deg, #16213e 0%, #1a1a2e 100%);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .poker-coach-logo {
      width: 28px;
      height: 28px;
      background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .poker-coach-logo svg { width: 18px; height: 18px; color: white; }
    .poker-coach-logo-error { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); }
    .poker-coach-title { flex: 1; font-weight: 600; font-size: 14px; color: #fff; }
    .poker-coach-close {
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.5);
      cursor: pointer;
      font-size: 20px;
      padding: 0;
      line-height: 1;
    }
    .poker-coach-close:hover { color: #fff; }
    .poker-coach-content { padding: 16px; color: #fff; }
    .poker-coach-recommendation {
      font-size: 28px;
      font-weight: 700;
      text-align: center;
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 12px;
    }
    .poker-coach-confidence { text-align: center; font-size: 13px; color: rgba(255, 255, 255, 0.7); margin-bottom: 12px; }
    .poker-coach-info { font-size: 13px; color: rgba(255, 255, 255, 0.9); margin-bottom: 8px; padding: 8px 10px; background: rgba(255, 255, 255, 0.05); border-radius: 6px; }
    .poker-coach-info strong { color: #22c55e; }
    .poker-coach-reasoning { font-size: 13px; line-height: 1.5; color: rgba(255, 255, 255, 0.8); margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(255, 255, 255, 0.1); }
    .poker-coach-footer { padding: 12px 16px; background: rgba(0, 0, 0, 0.2); display: flex; justify-content: flex-end; }
    .poker-coach-btn { background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); color: #fff; padding: 8px 16px; border-radius: 6px; font-size: 13px; cursor: pointer; }
    .poker-coach-btn:hover { background: rgba(255, 255, 255, 0.2); }
    .poker-coach-spinner { width: 40px; height: 40px; border: 3px solid rgba(34, 197, 94, 0.2); border-top-color: #22c55e; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 16px; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .poker-coach-loading-text { text-align: center; font-weight: 500; margin-bottom: 4px; }
    .poker-coach-loading-subtext { text-align: center; font-size: 12px; color: rgba(255, 255, 255, 0.6); }
    .poker-coach-error-text { color: #fca5a5; text-align: center; font-size: 14px; margin-bottom: 8px; }
    .poker-coach-error-hint { color: rgba(255, 255, 255, 0.5); text-align: center; font-size: 12px; margin-top: 8px; }
  `;
}

function hideOverlay() {
  if (overlayContainer) {
    overlayContainer.remove();
    overlayContainer = null;
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
