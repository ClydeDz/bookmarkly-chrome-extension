export const getTree = () => {
  chrome.bookmarks.getTree((results) => {
    return results;
  });
};

export const getChildren = (nodeId) => {
  chrome.bookmarks.getChildren(nodeId, (results) => {
    return results;
  });
};

export const get = (nodeId) => {
  chrome.bookmarks.get(nodeId, (results) => {
    return results;
  });
};

export const getRecent = (numberOfItems) => {
  chrome.bookmarks.getRecent(numberOfItems, (results) => {
    return results;
  });
};
