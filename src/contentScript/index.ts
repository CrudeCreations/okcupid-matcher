import { fetchLikes } from '../okcupid/fetchLikes';

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  console.log('Message received in content script:', request);
  
  if (request.action === 'getLikes') {
    chrome.storage.local.get(['likes', 'lastFetchTime'], (result) => {
      const now = Date.now();
      const ONE_MINUTE = 60 * 1000;

      // Check if likes are null or stale (older than 1 hour)
      if (!result.likes || !result.lastFetchTime || (now - result.lastFetchTime > ONE_MINUTE)) {
        console.log('Fetching fresh likes data');
        fetchLikes()
          .then(likes => {
            chrome.storage.local.set({
              likes: likes,
              lastFetchTime: now
            }, () => {
              sendResponse({likes: likes});
            });
          })
          .catch(error => {
            sendResponse({error: 'Failed to fetch likes'});
          });
      } else {
        sendResponse({likes: result.likes});
      }
    });

    return true; // Indicates that the response is sent asynchronously
  }
});