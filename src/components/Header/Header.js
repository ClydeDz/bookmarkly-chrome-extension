import { Title, Container, Button, Group } from "@mantine/core";

export const Header = () => {
  return (
    <Container fluid bg={"blue"}>
      <Group justify="space-between" h={80}>
        <Title order={1} size={"h2"} c={"white"}>
          Bookmarkly
        </Title>
        <div>
          <Button variant="light" c={"white"} radius="md">
            Add folder
          </Button>
          <Button variant="white" radius="md">
            Add bookmark
          </Button>
        </div>
      </Group>
    </Container>
  );
};
