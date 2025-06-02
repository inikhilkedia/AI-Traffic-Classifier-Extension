export async function saveToLocal(payload) {
    const existing = await chrome.storage.local.get(['events']);
    const updated = existing.events ? [...existing.events, payload] : [payload];
    await chrome.storage.local.set({ events: updated });
}
