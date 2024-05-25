import { Grid, Container } from "@mantine/core";
import { BookmarkLinks } from "../../components/BookmarkLinks/BookmarkLinks";
import { Demo } from "../../Demo";
import { BreadcrumbNav } from "../../components/BreadcrumbNav/BreadcrumbNav";
import { Bookmarks } from "../../components/Bookmarks/Bookmarks";

export const PopulatedPage = () => {
  return (
    <>
      <Container fluid>
        <BreadcrumbNav />
      </Container>
      <Container size="md" fluid>
        <Grid>
          <Grid.Col span={2}>
            <BookmarkLinks />
          </Grid.Col>
          <Grid.Col span={7}>
            <Bookmarks />
            {/* <Demo /> */}
          </Grid.Col>
          <Grid.Col span="auto">3</Grid.Col>
        </Grid>
      </Container>
    </>
  );
};
