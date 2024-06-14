import { Title, Container, Button, Group } from "@mantine/core";
import { ACTION_TYPE } from "../../const/app";
import { useDispatch } from "react-redux";
import { setDrawerType } from "../../state/redux/drawerSlice";
import { Sidebar } from "../Sidebar/Sidebar";
import { Search } from "../Search/Search";
import { IconFolderPlus, IconFilePlus } from "@tabler/icons-react";
import { HeaderMenu } from "../HeaderMenu/HeaderMenu";

export const Header = () => {
  const dispatch = useDispatch();

  return (
    <Container fluid bg={"blue"}>
      <Group justify="space-between" h={80}>
        <Title order={1} size={"h2"} c={"white"}>
          Bookmarkly
        </Title>
        <Search />
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
          <HeaderMenu />
        </div>
      </Group>
      <Sidebar />
    </Container>
  );
};
