import { Title, Container, Button, Group } from "@mantine/core";
import { ACTION_TYPE } from "../../const/app";
import { useDispatch } from "react-redux";
import { setDrawerType } from "../../state/redux/drawerSlice";
import { Sidebar } from "../Sidebar/Sidebar";
import { Search } from "../Search/Search";
import { IconFolder, IconFolderPlus, IconFilePlus } from "@tabler/icons-react";

export const Header = () => {
  const dispatch = useDispatch();

  return (
    <Container fluid bg={"blue"}>
      <Group justify="space-between" h={80}>
        <Title order={1} size={"h2"} c={"white"}>
          Bookmarkly
        </Title>
        <Search />
        {/* <Demo /> */}
        <div>
          <Button
            variant="light"
            c={"white"}
            radius="md"
            leftSection={<IconFolderPlus />}
            onClick={() => dispatch(setDrawerType(ACTION_TYPE.ADD_FOLDER))}
          >
            {ACTION_TYPE.ADD_FOLDER}
          </Button>
          <Button
            variant="white"
            radius="md"
            leftSection={<IconFilePlus />}
            onClick={() => dispatch(setDrawerType(ACTION_TYPE.ADD_BOOKMARK))}
          >
            {ACTION_TYPE.ADD_BOOKMARK}
          </Button>
        </div>
      </Group>
      <Sidebar />
    </Container>
  );
};
