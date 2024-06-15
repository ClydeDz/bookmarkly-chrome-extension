import {
  getMock,
  getChildrenMock,
  getTreeMock,
  getRecentMock,
  createMock,
  updateMock,
  searchMock,
  removeMock,
  onCreatedMock,
  onImportEndedMock,
  onMovedMock,
  onRemovedMock,
  onChangedMock,
  onChildrenReorderedMock,
} from "../mockApi/mockApi";
import {
  create,
  get,
  getChildren,
  getRecent,
  getTree,
  onChanged,
  onChildrenReordered,
  onCreated,
  onImportEnded,
  onMoved,
  onRemoved,
  remove,
  removeTree,
  search,
  update,
} from "../chromeApi/chromeApi";
import {
  NUMBER_OF_RECENT_BOOKMARKS,
  RECENT_BOOKMARKS_NODE_ID,
} from "../../const/app";

export const getBookmarksTree = () => {
  return isDevelopmentEnvironment() ? getTreeMock() : getTree();
};

export const getBookmarksAtNodeId = (nodeId) => {
  if (nodeId === RECENT_BOOKMARKS_NODE_ID) return getRecentBookmarks();

  return isDevelopmentEnvironment()
    ? getChildrenMock(nodeId)
    : getChildren(nodeId);
};

export const getInfoAboutNodeId = (nodeId) => {
  return isDevelopmentEnvironment() ? getMock(nodeId) : get(nodeId);
};

export const createFolder = (folderName, parentId) => {
  return isDevelopmentEnvironment()
    ? createMock(folderName, undefined, parentId)
    : create(folderName, undefined, parentId);
};

export const updateFolder = (itemId, folderName) => {
  return isDevelopmentEnvironment()
    ? updateMock(itemId, folderName, undefined)
    : update(itemId, folderName, undefined);
};

export const createBookmark = (bookmarkTitle, url, parentId) => {
  return isDevelopmentEnvironment()
    ? createMock(bookmarkTitle, url, parentId)
    : create(bookmarkTitle, url, parentId);
};

export const updateBookmark = (itemId, bookmarkTitle, url) => {
  return isDevelopmentEnvironment()
    ? updateMock(itemId, bookmarkTitle, url)
    : update(itemId, bookmarkTitle, url);
};

const getRecentBookmarks = () => {
  return isDevelopmentEnvironment()
    ? getRecentMock()
    : getRecent(NUMBER_OF_RECENT_BOOKMARKS);
};

export const searchBookmarks = (searchTerm) => {
  return isDevelopmentEnvironment()
    ? searchMock(searchTerm)
    : search(searchTerm);
};

export const removeBookmarkOrFolder = (id) => {
  return isDevelopmentEnvironment() ? removeMock(id) : remove(id);
};

export const removeRecursiveBookmarkOrFolder = (id) => {
  return isDevelopmentEnvironment() ? removeMock(id) : removeTree(id);
};

export const registerOnCreated = (callback) => {
  return isDevelopmentEnvironment()
    ? onCreatedMock(callback)
    : onCreated(callback);
};

export const registerOnImportEnded = (callback) => {
  return isDevelopmentEnvironment()
    ? onImportEndedMock(callback)
    : onImportEnded(callback);
};

export const registerOnMoved = (callback) => {
  return isDevelopmentEnvironment() ? onMovedMock(callback) : onMoved(callback);
};

export const registerOnRemoved = (callback) => {
  return isDevelopmentEnvironment()
    ? onRemovedMock(callback)
    : onRemoved(callback);
};

export const registerOnChanged = (callback) => {
  return isDevelopmentEnvironment()
    ? onChangedMock(callback)
    : onChanged(callback);
};

export const registerOnChildrenReordered = (callback) => {
  return isDevelopmentEnvironment()
    ? onChildrenReorderedMock(callback)
    : onChildrenReordered(callback);
};

const isDevelopmentEnvironment = () => {
  return process.env.NODE_ENV === "development";
};
