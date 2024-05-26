import { Title, Container, Button, Drawer, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AddFolder } from "../AddFolder/AddFolder";
import { AddBookmark } from "../AddBookmark/AddBookmark";

export const Header = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [opened2, { open: open2, close: close2 }] = useDisclosure(false);

  return (
    <Container fluid bg={"blue"}>
      <Group justify="space-between" h={80}>
        <Title order={1} size={"h2"} c={"white"}>
          Bookmarkly
        </Title>
        <div>
          <Button variant="light" c={"white"} radius="md" onClick={open}>
            Add folder
          </Button>
          <Button variant="white" radius="md" onClick={open2}>
            Add bookmark
          </Button>
          <Drawer
            opened={opened}
            onClose={close}
            title="Authentication"
            position="right"
            overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
          >
            <AddFolder />
          </Drawer>
          <Drawer
            opened={opened2}
            onClose={close2}
            title="Bob"
            position="right"
            overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
          >
            <AddBookmark />
          </Drawer>
        </div>
      </Group>
    </Container>
  );
};
