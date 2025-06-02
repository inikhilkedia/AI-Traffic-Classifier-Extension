"use strict";
/// <reference types="chrome" />
function classifyRequest(url) {
    const aiPatterns = [
        /\.?openai\.com\/v1\//,
        /chatgpt\.com\/backend-api\/conversation/,
        /api\.anthropic\.com\/v1/,
        /perplexity\.ai/,
        /gemini\.googleapis\.com/,
        /huggingface\.co\/api/,
        /claude\.ai/,
        /ai\./i
    ];
    const lowerUrl = url.toLowerCase();
    return aiPatterns.some(pattern => pattern.test(lowerUrl)) ? 'high' : 'low';
}
function handleRequest(details) {
    const confidence = classifyRequest(details.url);
    const request = {
        url: details.url,
        time: new Date().toISOString(),
        method: details.method,
        confidence
    };
    chrome.storage.local.get({ logs: [] }, (data) => {
        const updatedLogs = [request, ...data.logs].slice(0, 100); // Keep last 100
        console.log('Storing request:', request);
        chrome.storage.local.set({ logs: updatedLogs });
        // Update badge count for high-confidence requests
        if (confidence === 'high') {
            chrome.action.getBadgeText({}, (text) => {
                const currentCount = Number.isNaN(parseInt(text || '', 10)) ? 0 : parseInt(text, 10);
                const count = currentCount + 1;
                chrome.action.setBadgeText({ text: count.toString() });
                chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });
            });
        }
    });
}
chrome.webRequest.onCompleted.addListener(handleRequest, { urls: ["<all_urls>"] }, []);
