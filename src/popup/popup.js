"use strict";
/// <reference types="chrome" />
function loadLogs() {
    const container = document.getElementById('log-list');
    if (!container)
        return;
    chrome.storage.local.get({ logs: [] }, (data) => {
        container.innerHTML = '';
        if (data.logs.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'log-entry';
            empty.textContent = 'No logs recorded yet.';
            container.appendChild(empty);
        }
        else {
            data.logs.forEach((log) => {
                const item = document.createElement('div');
                const confidenceScore = typeof log.confidence === 'number' ? log.confidence : 0;
                const isHighConfidence = confidenceScore > 0.8;
                item.className = isHighConfidence ? 'log-entry high-confidence' : 'log-entry low-confidence';
                const urlObj = new URL(log.url);
                const confidence = log.confidence ?? 'N/A';
                const confidenceLabel = isHighConfidence
                    ? `<span style="color: red;">High Confidence</span>`
                    : `<span style="color: gray;">Low Confidence</span>`;
                item.innerHTML = `
          <strong>${urlObj.hostname}</strong><br>
          [${log.method}] ${log.url} <br>
          <em>${new Date(log.time).toLocaleTimeString()}</em><br>
          ${confidenceLabel} (score: ${confidence})
        `;
                container.appendChild(item);
            });
        }
    });
}
function clearLogs() {
    chrome.storage.local.clear(() => {
        loadLogs();
    });
}
document.addEventListener('DOMContentLoaded', () => {
    loadLogs();
    document.getElementById('clear-btn')?.addEventListener('click', clearLogs);
});
