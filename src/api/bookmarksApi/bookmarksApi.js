import {
  getMock,
  getChildrenMock,
  getTreeMock,
  getRecentMock,
} from "../mockApi/mockApi";
import { get, getChildren, getRecent, getTree } from "../chromeApi/chromeApi";
import {
  DEFAULT_RECENT_BOOKMARKS_FOLDER,
  NUMBER_OF_RECENT_BOOKMARKS,
  RECENT_BOOKMARKS_NODE_ID,
} from "../../const/app";

export const getBookmarksTree = () => {
  return isDevelopmentEnvironment() ? getTreeMock() : getTree();
};

export const getBookmarksAtNodeId = (nodeId) => {
  if (nodeId === RECENT_BOOKMARKS_NODE_ID) return getRecentBookmarks();

  return isDevelopmentEnvironment() ? getChildrenMock() : getChildren(nodeId);
};

export const getInfoAboutNodeId = (nodeId) => {
  if (nodeId === RECENT_BOOKMARKS_NODE_ID) return getInfoAboutRecentBookmarks();

  return isDevelopmentEnvironment() ? getMock(nodeId) : get(nodeId);
};

const getInfoAboutRecentBookmarks = () => {
  return [
    {
      dateAdded: 1716273675228,
      dateGroupModified: 1716600522433,
      id: RECENT_BOOKMARKS_NODE_ID,
      index: 0,
      parentId: RECENT_BOOKMARKS_NODE_ID,
      title: DEFAULT_RECENT_BOOKMARKS_FOLDER,
    },
  ];
};

const getRecentBookmarks = () => {
  return isDevelopmentEnvironment()
    ? getRecentMock()
    : getRecent(NUMBER_OF_RECENT_BOOKMARKS);
};

const isDevelopmentEnvironment = () => {
  return process.env.NODE_ENV === "development";
};
