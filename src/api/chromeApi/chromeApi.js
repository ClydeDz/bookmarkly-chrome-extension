export const getTree = () => {
  return chrome.bookmarks.getTree();
};

export const getChildren = (nodeId) => {
  return chrome.bookmarks.getChildren(nodeId);
};

export const get = (nodeId) => {
  return chrome.bookmarks.get(nodeId);
};

export const getRecent = (numberOfItems) => {
  return chrome.bookmarks.getRecent(numberOfItems);
};
