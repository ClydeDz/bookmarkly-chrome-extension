import { getMock, getChildrenMock, getTreeMock } from "../mockApi/mockApi";
import { get, getChildren, getTree } from "../chromeApi/chromeApi";

export const getBookmarksTree = () => {
  return process.env.NODE_ENV === "development" ? getTreeMock() : getTree();
};

export const getBookmarksAtNodeId = (nodeId) => {
  return process.env.NODE_ENV === "development"
    ? getChildrenMock()
    : getChildren(nodeId);
};

export const getInfoAboutNodeId = (nodeId) => {
  return process.env.NODE_ENV === "development" ? getMock(nodeId) : get(nodeId);
};
