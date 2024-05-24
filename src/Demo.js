import { Button } from "@mantine/core";
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
const GeoPattern = require("geopattern");

export const Demo = () => {
  return (
    <p>
      <Button variant="filled">Button</Button>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            src={GeoPattern.generate(
              "https://stackoverflow.com/questions/52083526/set-ignore-list-for-no-undef-defining-expected-variables-from-other-sources"
            ).toDataUri()}
            height={160}
            alt="Norway"
          />
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>Norway Fjord Adventures</Text>
          <Badge color="pink">On Sale</Badge>
        </Group>

        <Text size="sm" c="dimmed">
          With Fjord Tours you can explore more of the magical fjord landscapes
          with tours and activities on and around the fjords of Norway
        </Text>

        <Button color="blue" fullWidth mt="md" radius="md">
          Book classic tour now
        </Button>
      </Card>
      {/* <img
          width={120}
          height={40}
          src={GeoPattern.generate("GitHub").toDataUri()}
        /> */}
    </p>
  );
};
