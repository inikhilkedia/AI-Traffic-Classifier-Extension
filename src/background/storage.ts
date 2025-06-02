export async function saveLogEntry(entry: any) {
  const timestampedEntry = {
    ...entry,
    timestamp: new Date().toISOString(),
  };

  chrome.storage.local.get(['logs'], (result) => {
    const logs = result.logs || [];
    logs.unshift(timestampedEntry); // Add to beginning

    // Keep only the latest 100 logs
    if (logs.length > 100) {
      logs.length = 100;
    }

    chrome.storage.local.set({ logs });
  });
}