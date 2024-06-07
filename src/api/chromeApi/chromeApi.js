import {
  RECENT_BOOKMARKS_NODE_ID,
  RECENT_BOOKMARKS_NODE_INFO,
} from "../../const/app";

export const getTree = () => {
  return chrome.bookmarks.getTree();
};

export const getChildren = (nodeId) => {
  return chrome.bookmarks.getChildren(nodeId);
};

export const get = (nodeId) => {
  if (nodeId === RECENT_BOOKMARKS_NODE_ID) {
    return Promise.resolve(RECENT_BOOKMARKS_NODE_INFO);
  }

  return chrome.bookmarks.get(nodeId);
};

export const getRecent = (numberOfItems) => {
  return chrome.bookmarks.getRecent(numberOfItems);
};

export const create = (title, url, parentId) => {
  return chrome.bookmarks.create({ title, url, parentId });
};

export const update = (id, title, url) => {
  return chrome.bookmarks.update(id, { title, url });
};

export const search = (searchTerm) => {
  return chrome.bookmarks.search(searchTerm);
};

export const remove = (id) => {
  return chrome.bookmarks.remove(id);
};
