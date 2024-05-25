import { Breadcrumbs, Anchor, Stack } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { getInfoAboutNodeId } from "../../api/bookmarksApi/bookmarksApi";
import { useEffect, useState } from "react";
import { setCurrentNodeId } from "../../state/redux/navigationSlice";

export const BreadcrumbNav = () => {
  const dispatch = useDispatch();
  const currentBookmarkNodeId = useSelector(
    (state) => state.navigation.currentNodeId
  );
  const [linkTree, setLinkTree] = useState([]);

  const createLinkTree = (nodeId) => {
    const bookmarkNode = getInfoAboutNodeId(nodeId)[0];
    setLinkTree((oldArray) => [
      ...oldArray,
      { title: bookmarkNode.title, nodeId },
    ]);

    if (bookmarkNode.parentId !== "0") {
      createLinkTree(bookmarkNode.parentId);
    }
  };

  useEffect(() => {
    setLinkTree([]);
    createLinkTree(currentBookmarkNodeId);
  }, [currentBookmarkNodeId]);

  const onMenuItemClick = (nodeId) => {
    dispatch(setCurrentNodeId(nodeId));
  };

  return (
    <Stack align="flex-start" justify="center" gap="md" h={50}>
      <Breadcrumbs>
        {linkTree.reverse().map((item, index) => (
          <Anchor
            href="#"
            key={index}
            onClick={() => onMenuItemClick(item.nodeId)}
          >
            {item.title}
          </Anchor>
        ))}
      </Breadcrumbs>
    </Stack>
  );
};
