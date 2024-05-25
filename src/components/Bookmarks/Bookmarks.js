import { useSelector } from "react-redux";
import { getBookmarksAtNodeId } from "../../api/bookmarksApi/bookmarksApi";
import { useEffect, useState } from "react";
import { Card, Image, Text, Badge, Button, Group, Flex } from "@mantine/core";
import { truncateString } from "../../utils/string";
const GeoPattern = require("geopattern");

export const Bookmarks = () => {
  const nodeId = useSelector((state) => state.navigation.currentNodeId);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    setBookmarks(getBookmarksAtNodeId(nodeId));
  }, [nodeId]);

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
          <Card shadow="sm" padding="lg" radius="md" withBorder miw={"sm"}>
            <Card.Section>
              <Image
                src={GeoPattern.generate(item.url).toDataUri()}
                height={160}
                alt="Norway"
              />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>{truncateString(item.title, 20)}</Text>
              <Badge color="green" circle>
                9
              </Badge>
            </Group>

            <Button color="blue" fullWidth mt="md" radius="md">
              Book classic tour now
            </Button>
          </Card>
        );
      })}
    </Flex>
  );
};
