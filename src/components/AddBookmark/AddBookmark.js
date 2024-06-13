import { useForm } from "@mantine/form";
import { TextInput, Button } from "@mantine/core";
import { useSelector } from "react-redux";
import {
  createBookmark,
  getInfoAboutNodeId,
  updateBookmark,
} from "../../api/bookmarksApi/bookmarksApi";
import { isValidURL } from "../../utils/url";
import { useEffect } from "react";
import { ACTION_TYPE } from "../../const/app";

export const AddBookmark = (props) => {
  const { onSuccessCallback, onFailureCallback } = props;
  const { currentNodeId, itemId } = useSelector((state) => state.navigation);
  const drawerType = useSelector((state) => state.drawer.drawerType);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: { bookmarkTitle: "", url: "" },
    validate: {
      bookmarkTitle: (value) =>
        !value ? "Bookmark title cannot be empty" : null,
      url: (value) => (!value ? "URL cannot be empty" : null),
      url: (value) => (!isValidURL(value) ? "URL is invalid" : null),
    },
  });

  const addBookmark = async (data) => {
    await createBookmark(data.bookmarkTitle, data.url, currentNodeId)
      .then((results) => {
        if (results.title === data.bookmarkTitle) onSuccessCallback();
      })
      .catch((error) => {
        if (error) onFailureCallback();
      });
  };

  const editBookmark = async (data) => {
    await updateBookmark(itemId, data.bookmarkTitle, data.url)
      .then((results) => {
        if (results.title === data.bookmarkTitle) onSuccessCallback();
      })
      .catch((error) => {
        if (error) onFailureCallback();
      });
  };

  const initializeValues = async () => {
    const itemDetails = await getInfoAboutNodeId(itemId);
    if (!itemDetails) return;

    form.setValues({
      bookmarkTitle: itemDetails[0].title,
      url: itemDetails[0].url,
    });
  };

  useEffect(() => {
    itemId && initializeValues();
  }, [itemId]);

  return (
    <form
      onSubmit={form.onSubmit(
        drawerType === ACTION_TYPE.ADD_BOOKMARK ? addBookmark : editBookmark
      )}
    >
      <TextInput
        label="Bookmark title"
        key={form.key("bookmarkTitle")}
        {...form.getInputProps("bookmarkTitle")}
      />
      <TextInput
        label="URL"
        key={form.key("url")}
        {...form.getInputProps("url")}
      />
      <Button type="submit" mt="sm">
        {drawerType === ACTION_TYPE.ADD_BOOKMARK ? "Add" : "Update"}
      </Button>
    </form>
  );
};
