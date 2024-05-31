import {
  getMock,
  getChildrenMock,
  getTreeMock,
  getRecentMock,
  createMock,
} from "../mockApi/mockApi";
import {
  create,
  get,
  getChildren,
  getRecent,
  getTree,
} from "../chromeApi/chromeApi";
import {
  RECENT_BOOKMARKS_FOLDER,
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

export const createBookmark = (bookmarkTitle, url, parentId) => {
  return isDevelopmentEnvironment()
    ? createMock(bookmarkTitle, url, parentId)
    : create(bookmarkTitle, url, parentId);
};

const getRecentBookmarks = () => {
  return isDevelopmentEnvironment()
    ? getRecentMock()
    : getRecent(NUMBER_OF_RECENT_BOOKMARKS);
};

const isDevelopmentEnvironment = () => {
  return process.env.NODE_ENV === "development";
};
