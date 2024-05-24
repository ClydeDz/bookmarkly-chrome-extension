import { Grid } from "@mantine/core";
import { BookmarkLinks } from "../../components/BookmarkLinks/BookmarkLinks";

export const PopulatedPage = () => {
  return (
    <Grid>
      <Grid.Col span="auto">
        <BookmarkLinks />
      </Grid.Col>
      <Grid.Col span={6}>2</Grid.Col>
      <Grid.Col span="auto">3</Grid.Col>
    </Grid>
  );
};
