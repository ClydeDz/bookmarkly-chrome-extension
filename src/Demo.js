import { Card, Image, Text, Badge, Button, Group, Flex } from "@mantine/core";
const GeoPattern = require("geopattern");

export const Demo = () => {
  return (
    <>
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap={{ base: "sm", sm: "lg" }}
      >
        <Button variant="filled">Button</Button>
        <Card shadow="sm" padding="lg" radius="md" withBorder miw={"sm"}>
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
            <Badge color="green" circle>
              9
            </Badge>
          </Group>

          <Button color="blue" fullWidth mt="md" radius="md">
            Book classic tour now
          </Button>
        </Card>
      </Flex>

      {/* <img
          width={120}
          height={40}
          src={GeoPattern.generate("GitHub").toDataUri()}
        /> */}
    </>
  );
};
