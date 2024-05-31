import { Title, Container, Button, Drawer, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AddFolder } from "../AddFolder/AddFolder";
import { AddBookmark } from "../AddBookmark/AddBookmark";
import { useState } from "react";
import { ACTION_TYPE } from "../../const/app";

export const Header = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [drawerType, setDrawerType] = useState(ACTION_TYPE.ADD_FOLDER);

  const openDrawer = (actionType) => {
    setDrawerType(actionType);
    open();
  };

  return (
    <Container fluid bg={"blue"}>
      <Group justify="space-between" h={80}>
        <Title order={1} size={"h2"} c={"white"}>
          Bookmarkly
        </Title>
        <div>
          <Button
            variant="light"
            c={"white"}
            radius="md"
            onClick={() => openDrawer(ACTION_TYPE.ADD_FOLDER)}
          >
            Add folder
          </Button>
          <Button
            variant="white"
            radius="md"
            onClick={() => openDrawer(ACTION_TYPE.ADD_BOOKMARK)}
          >
            Add bookmark
          </Button>
          <Drawer
            opened={opened}
            onClose={close}
            title={
              drawerType === ACTION_TYPE.ADD_FOLDER
                ? "Add folder"
                : "Add bookmark"
            }
            position="right"
            overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
          >
            {drawerType === ACTION_TYPE.ADD_FOLDER ? (
              <AddFolder onSuccessCallback={close} />
            ) : (
              <AddBookmark />
            )}
          </Drawer>
        </div>
      </Group>
    </Container>
  );
};
