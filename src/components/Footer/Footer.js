import { Container, Group, Anchor, Text, Divider } from "@mantine/core";

export const Footer = () => {
  return (
    <Container fluid mb={"sm"} mt={10}>
      <Group p={10} justify="center">
        <Text size="sm" c="dimmed">
          Developed by{" "}
          <Anchor
            href="https://clydedsouza.net/"
            target="_blank"
            size="sm"
            c="dimmed"
          >
            Clyde D'Souza
          </Anchor>
        </Text>
        <Divider orientation="vertical" />
        <Anchor
          href="https://github.com/ClydeDz/bookmarkly-chrome-extension/issues/new"
          target="_blank"
          size="sm"
          c="dimmed"
        >
          Found an issue?
        </Anchor>
        <Divider orientation="vertical" />
        <Anchor
          href="https://sponsor.clydedsouza.net/"
          target="_blank"
          size="sm"
          c="dimmed"
        >
          Sponsor
        </Anchor>
      </Group>
    </Container>

    // <Container fluid>

    // </Container>
  );
};
