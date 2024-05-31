import { Title, Container, Button, Drawer, Group } from "@mantine/core";
import { ACTION_TYPE } from "../../const/app";
import { useDispatch } from "react-redux";
import { setDrawerType } from "../../state/redux/drawerSlice";
import { Sidebar } from "../Sidebar/Sidebar";

export const Header = () => {
  const dispatch = useDispatch();

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
            onClick={() => dispatch(setDrawerType(ACTION_TYPE.ADD_FOLDER))}
          >
            {ACTION_TYPE.ADD_FOLDER}
          </Button>
          <Button
            variant="white"
            radius="md"
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
