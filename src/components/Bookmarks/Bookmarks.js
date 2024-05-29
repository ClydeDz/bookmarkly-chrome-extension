import { useDispatch, useSelector } from "react-redux";
import { getBookmarksAtNodeId } from "../../api/bookmarksApi/bookmarksApi";
import { useEffect, useState } from "react";
import {
  Text,
  Avatar,
  Button,
  Group,
  Flex,
  Paper,
  Anchor,
} from "@mantine/core";
import { truncateString } from "../../utils/string";
import { IconEdit, IconTrash, IconFolder } from "@tabler/icons-react";
import { setCurrentNodeId } from "../../state/redux/navigationSlice";
import "./bookmarks.css";

export const Bookmarks = () => {
  const nodeId = useSelector((state) => state.navigation.currentNodeId);
  const [bookmarks, setBookmarks] = useState([]);
  const dispatch = useDispatch();

  const loadBookmarkData = async () => {
    setBookmarks(await getBookmarksAtNodeId(nodeId));
  };

  useEffect(() => {
    loadBookmarkData();
  }, [nodeId]);

  const onCardClick = (item) => {
    item.url && window.open(item.url, "_blank")?.focus();

    dispatch(setCurrentNodeId(item.id));
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
      {bookmarks.map((item) => {
        return (
          <Paper
            shadow="xs"
            p="sm"
            w={"100%"}
            key={`${item.title}${Math.random()}`}
            onClick={() => onCardClick(item)}
            className="bookmark-card"
          >
            <Group justify="space-between">
              <Group justify="flex-start">
                {item.url ? (
                  <Avatar
                    src={`https://www.google.com/s2/favicons?domain=${item.url}&sz=128`}
                    alt="it's me"
                    size={"sm"}
                  />
                ) : (
                  <Avatar color="blue" bg={"white"} size={"sm"}>
                    <IconFolder size={16} />
                  </Avatar>
                )}
                <Text>{truncateString(item.title, 60)}</Text>
              </Group>
              <Group justify="flex-end">
                <Button variant="outline" leftSection={<IconEdit size={14} />}>
                  Edit
                </Button>
                <Button variant="light" leftSection={<IconTrash size={14} />}>
                  Delete
                </Button>
              </Group>
            </Group>
            {item.url && (
              <Group justify="flex-start" preventGrowOverflow={true} pl={45}>
                <Anchor href={item.url}>{truncateString(item.url, 50)}</Anchor>
              </Group>
            )}
          </Paper>
        );
      })}
    </Flex>
  );
};
