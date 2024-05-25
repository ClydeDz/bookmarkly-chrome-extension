import { MOCK_DATA } from "./mockData";

export const getTreeMock = () => {
  return MOCK_DATA;
};

export const getChildrenMock = () => {
  return MOCK_DATA[0].children[0].children;
};
