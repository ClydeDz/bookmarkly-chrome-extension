import { getTreeMock } from "../mockApi/mockApi";
import { getTree } from "../chromeApi/chromeApi";

export const getBookmarksTree = () => {
  return process.env.NODE_ENV === "development" ? getTreeMock() : getTree();
};
