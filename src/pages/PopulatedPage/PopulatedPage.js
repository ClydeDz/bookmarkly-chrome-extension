import { Grid } from "@mantine/core";
import { BookmarkLinks } from "../../components/BookmarkLinks/BookmarkLinks";
import { Demo } from "../../Demo";

export const PopulatedPage = () => {
  return (
    <Grid>
      <Grid.Col span={2}>
        <BookmarkLinks />
      </Grid.Col>
      <Grid.Col span={6}>
        <Demo />
      </Grid.Col>
      <Grid.Col span="auto">3</Grid.Col>
    </Grid>
  );
};
