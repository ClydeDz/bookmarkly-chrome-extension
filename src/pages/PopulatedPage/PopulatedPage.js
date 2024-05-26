import { Grid, Container } from "@mantine/core";
import { BookmarkLinks } from "../../components/BookmarkLinks/BookmarkLinks";
import { BreadcrumbNav } from "../../components/BreadcrumbNav/BreadcrumbNav";
import { Bookmarks } from "../../components/Bookmarks/Bookmarks";
import { AddItem } from "../../components/AddItem/AddItem";

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
          </Grid.Col>
          <Grid.Col span="auto">
            <AddItem />
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
};
