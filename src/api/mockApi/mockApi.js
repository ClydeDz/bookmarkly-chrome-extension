import {
  EMPTY_FOLDER_ID_MOCK_DATA,
  GET_CHILDREN_MOCK_DATA,
} from "./mockData/getChildrenData";
import { GET_TREE_MOCK_DATA } from "./mockData/getTreeData";
import { GET_BY_ID_MOCK_DATA } from "./mockData/getByIdData";
import { GET_RECENT_MOCK_DATA } from "./mockData/getRecentData";
import {
  RECENT_BOOKMARKS_NODE_ID,
  RECENT_BOOKMARKS_NODE_INFO,
} from "../../const/app";
import { GET_SUBTREE_MOCK_DATA } from "./mockData/getSubtreeData";

export const getTreeMock = () => {
  return Promise.resolve(GET_TREE_MOCK_DATA);
};

export const getChildrenMock = (nodeId) => {
  if (nodeId === EMPTY_FOLDER_ID_MOCK_DATA) {
    return Promise.resolve([]);
  }

  return Promise.resolve(GET_SUBTREE_MOCK_DATA);
};

export const getMock = (nodeId) => {
  if (nodeId === RECENT_BOOKMARKS_NODE_ID) {
    return Promise.resolve(RECENT_BOOKMARKS_NODE_INFO);
  }

  return Promise.resolve(GET_BY_ID_MOCK_DATA[nodeId]);
};

export const getRecentMock = () => {
  return Promise.resolve(GET_RECENT_MOCK_DATA);
};

export const createMock = (title, url, parentId) => {
  return Promise.resolve({ title, url, parentId });
};

export const updateMock = (id, title, url) => {
  return Promise.resolve({ id, title, url });
};

export const searchMock = (searchTerm) => {
  return Promise.resolve(GET_CHILDREN_MOCK_DATA);
};

export const removeMock = (id) => {
  return Promise.resolve();
};

export const onCreatedMock = (callback) => {
  callback();
};

export const onRemovedMock = (callback) => {
  callback();
};

export const onMovedMock = (callback) => {
  callback();
};

export const onImportEndedMock = (callback) => {
  callback();
};

export const onChangedMock = (callback) => {
  callback();
};

export const onChildrenReorderedMock = (callback) => {
  callback();
};
