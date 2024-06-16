import { useDispatch, useSelector } from "react-redux";
import {
  getBookmarksAtNodeId,
  removeBookmarkOrFolder,
  removeRecursiveBookmarkOrFolder,
} from "../../api/bookmarksApi/bookmarksApi";
import { useContext, useEffect, useState } from "react";
import {
  Text,
  Avatar,
  Button,
  Group,
  Flex,
  Paper,
  Indicator,
} from "@mantine/core";
import { truncateString } from "../../utils/string";
import { IconEdit, IconTrash, IconFolder } from "@tabler/icons-react";
import { setCurrentNodeId, setItemId } from "../../state/redux/navigationSlice";
import "./bookmarks.css";
import { NoBookmarks } from "../NoBookmarks/NoBookmarks";
import { ACTION_TYPE, TOAST_TYPE } from "../../const/app";
import { setDrawerType } from "../../state/redux/drawerSlice";
import { useToast } from "../../hooks/useToast";
import { BookmarkEventsContext } from "../../context/BookmarkEventsContext";

export const Bookmarks = () => {
  const bookmarkEventsTriggered = useContext(BookmarkEventsContext);
  const nodeId = useSelector((state) => state.navigation.currentNodeId);
  const [bookmarks, setBookmarks] = useState([]);
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const loadBookmarkData = async () => {
    const rawResults = await getBookmarksAtNodeId(nodeId);
    if (!rawResults || rawResults.length === 0) {
      setBookmarks([]);
      return;
    }

    const results = rawResults.length > 1 ? rawResults : rawResults[0].children;
    const sortedResults =
      results &&
      results
        .filter((item) => item.url)
        .concat(results.filter((item) => !item.url));
    setBookmarks(sortedResults);
  };

  useEffect(() => {
    loadBookmarkData();
  }, [nodeId]);

  useEffect(() => {
    loadBookmarkData();
  }, [bookmarkEventsTriggered]);

  const onCardClick = (item) => {
    item.url && window.open(item.url, "_blank")?.focus();

    dispatch(setCurrentNodeId(item.id));
  };

  const onEditClick = (item) => {
    dispatch(setItemId(item.id));
    if (item.url) {
      dispatch(setDrawerType(ACTION_TYPE.EDIT_BOOKMARK));
    } else {
      dispatch(setDrawerType(ACTION_TYPE.EDIT_FOLDER));
    }
  };

  const onDeleteClick = async (item) => {
    const isBookmark = item && item.url;

    const removeDelegate =
      !isBookmark && item.children.length > 0
        ? removeRecursiveBookmarkOrFolder
        : removeBookmarkOrFolder;

    await removeDelegate(item.id)
      .then((value) => {
        showToast({
          title: "Deleted successfully",
          message: `${
            isBookmark ? "Bookmark" : "Folder"
          } has been deleted successfully`,
          type: TOAST_TYPE.SUCCESS,
        });
      })
      .catch((error) => {
        showToast({
          title: "Apologies",
          message: `There was an issue deleting this ${
            isBookmark ? "bookmark" : "folder"
          }`,
          type: TOAST_TYPE.FAILURE,
        });
      });
  };

  return (
    <Flex
      mih={20}
      gap="md"
      justify="flex-start"
      align="flex-start"
      direction="row"
      wrap={"wrap"}
    >
      {bookmarks && bookmarks.length < 1 && <NoBookmarks />}
      {bookmarks &&
        bookmarks.length > 0 &&
        bookmarks.map((item) => {
          return (
            <Paper
              shadow="xs"
              p="sm"
              w={"100%"}
              key={`${item.title}${Math.random()}`}
            >
              <Group justify="space-between">
                <Group
                  justify="flex-start"
                  onClick={() => onCardClick(item)}
                  className="bookmark-card"
                >
                  {item.url ? (
                    <Avatar
                      src={`https://www.google.com/s2/favicons?domain=${item.url}&sz=128`}
                      alt="it's me"
                      size={"sm"}
                    />
                  ) : (
                    <Indicator
                      inline
                      processing={item.children?.length > 0}
                      color="blue"
                      label={item.children?.length || 0}
                      size={16}
                    >
                      <Avatar color="blue" bg={"white"} size={"sm"}>
                        <IconFolder size={16} />
                      </Avatar>
                    </Indicator>
                  )}
                  <Text>{truncateString(item.title, 60)}</Text>
                </Group>
                <Group justify="flex-end">
                  <Button
                    variant="outline"
                    leftSection={<IconEdit size={14} />}
                    onClick={() => onEditClick(item)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="light"
                    leftSection={<IconTrash size={14} />}
                    onClick={() => onDeleteClick(item)}
                  >
                    Delete
                  </Button>
                </Group>
              </Group>
              {item.url && (
                <Group justify="flex-start" preventGrowOverflow={true} pl={45}>
                  <Text size="sm" opacity={0.7}>
                    {truncateString(item.url, 50)}
                  </Text>
                </Group>
              )}
            </Paper>
          );
        })}
    </Flex>
  );
};
