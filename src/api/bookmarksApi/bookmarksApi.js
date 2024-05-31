import {
  getMock,
  getChildrenMock,
  getTreeMock,
  getRecentMock,
} from "../mockApi/mockApi";
import { get, getChildren, getRecent, getTree } from "../chromeApi/chromeApi";
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

  return isDevelopmentEnvironment() ? getChildrenMock(nodeId) : getChildren(nodeId);
};

export const getInfoAboutNodeId = (nodeId) => {
  return isDevelopmentEnvironment() ? getMock(nodeId) : get(nodeId);
};

const getRecentBookmarks = () => {
  return isDevelopmentEnvironment()
    ? getRecentMock()
    : getRecent(NUMBER_OF_RECENT_BOOKMARKS);
};

const isDevelopmentEnvironment = () => {
  return process.env.NODE_ENV === "development";
};
