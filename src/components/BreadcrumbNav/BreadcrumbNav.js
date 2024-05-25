import { Breadcrumbs, Anchor, Stack } from "@mantine/core";

const items = [
  { title: "Mantine", href: "#" },
  { title: "Mantine hooks", href: "#" },
  { title: "use-id", href: "#" },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

export const BreadcrumbNav = () => {
  return (
    <Stack align="flex-start" justify="center" gap="md" h={50}>
      <Breadcrumbs>{items}</Breadcrumbs>
    </Stack>
  );
};
