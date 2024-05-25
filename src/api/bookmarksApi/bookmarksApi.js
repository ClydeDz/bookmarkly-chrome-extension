import { getChildrenMock, getTreeMock } from "../mockApi/mockApi";
import { getChildren, getTree } from "../chromeApi/chromeApi";

export const getBookmarksTree = () => {
  return process.env.NODE_ENV === "development" ? getTreeMock() : getTree();
};

export const getBookmarksAtNodeId = (nodeId) => {
  return process.env.NODE_ENV === "development"
    ? getChildrenMock()
    : getChildren(nodeId);
};
