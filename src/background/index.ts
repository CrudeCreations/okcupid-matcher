chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url?.includes('okcupid.com')) {
    chrome.tabs.sendMessage(tabId, { action: 'fetchLikes' });
  }
});