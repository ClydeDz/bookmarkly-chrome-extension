import { Breadcrumbs, Anchor, Stack } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { getInfoAboutNodeId } from "../../api/bookmarksApi/bookmarksApi";
import { useContext, useEffect, useState } from "react";
import { setCurrentNodeId } from "../../state/redux/navigationSlice";
import { RECENT_BOOKMARKS_NODE_ID } from "../../const/app";
import { AppContext } from "../../state/context/AppContext";

export const BreadcrumbNav = () => {
  const dispatch = useDispatch();
  const [linkTree, setLinkTree] = useState([]);
  const currentBookmarkNodeId = useSelector(
    (state) => state.navigation.currentNodeId
  );
  const bookmarksFromProvider = useContext(AppContext);

  const createLinkTree = async (nodeId) => {
    if (!nodeId) return;

    const bookmarkNodeResults = await getInfoAboutNodeId(nodeId);
    const bookmarkNode = bookmarkNodeResults[0];

    setLinkTree((oldArray) => [
      { title: bookmarkNode.title, nodeId },
      ...oldArray,
    ]);

    if (bookmarkNode.parentId !== RECENT_BOOKMARKS_NODE_ID) {
      await createLinkTree(bookmarkNode.parentId);
    }
  };

  useEffect(() => {
    setLinkTree([]);
    createLinkTree(currentBookmarkNodeId);
  }, [currentBookmarkNodeId, bookmarksFromProvider]);

  const onMenuItemClick = (nodeId) => {
    dispatch(setCurrentNodeId(nodeId));
  };

  return (
    <Stack align="flex-start" justify="center" gap="md" h={50}>
      <Breadcrumbs>
        {linkTree.map((item, index) => (
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
