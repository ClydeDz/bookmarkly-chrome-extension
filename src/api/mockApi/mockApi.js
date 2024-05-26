import { GET_CHILDREN_MOCK_DATA } from "./mockData/getChildrenData";
import { GET_TREE_MOCK_DATA } from "./mockData/getTreeData";
import { GET_BY_ID_MOCK_DATA } from "./mockData/getByIdData";
import { GET_RECENT_MOCK_DATA } from "./mockData/getRecentData";

export const getTreeMock = () => {
  return GET_TREE_MOCK_DATA;
};

export const getChildrenMock = () => {
  return GET_CHILDREN_MOCK_DATA;
};

export const getMock = (nodeId) => {
  return GET_BY_ID_MOCK_DATA[nodeId];
};

export const getRecentMock = () => {
  return GET_RECENT_MOCK_DATA;
};
