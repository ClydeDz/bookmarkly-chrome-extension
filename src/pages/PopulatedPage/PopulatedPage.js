import { Grid, Container } from "@mantine/core";
import { BookmarkLinks } from "../../components/BookmarkLinks/BookmarkLinks";
import { BreadcrumbNav } from "../../components/BreadcrumbNav/BreadcrumbNav";
import { Bookmarks } from "../../components/Bookmarks/Bookmarks";

export const PopulatedPage = () => {
  return (
    <>
      <Container fluid mb={"sm"}>
        <BreadcrumbNav />
      </Container>
      <Container size="md" fluid>
        <Grid>
          <Grid.Col span={2}>
            <BookmarkLinks />
          </Grid.Col>
          <Grid.Col span="auto">
            <Bookmarks />
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
};
