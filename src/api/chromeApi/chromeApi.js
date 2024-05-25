export const getTree = () => {
  chrome.bookmarks.getTree((results) => {
    return results;
  });
};

export const getChildren = (nodeId) => {
  chrome.bookmarks.get(nodeId, (results) => {
    return results;
  });
};
