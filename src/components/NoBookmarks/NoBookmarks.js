import { Text, Group, Paper, Title } from "@mantine/core";

export const NoBookmarks = () => {
  return (
    <Paper shadow="xs" p="sm" w={"100%"}>
      <Group justify="center">
        <Title order={1} size={"h4"}>
          You've reached an empty folder
        </Title>
      </Group>
      <Group justify="center" pt={"xs"}>
        <Text>
          No bookmarks or folders found. Add a folder or a bookmark so that it
          appears here.
        </Text>
      </Group>
    </Paper>
  );
};
