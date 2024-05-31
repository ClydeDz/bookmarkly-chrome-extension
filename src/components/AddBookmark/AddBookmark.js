import { useForm } from "@mantine/form";
import { TextInput, Button } from "@mantine/core";
import { useSelector } from "react-redux";
import { createBookmark } from "../../api/bookmarksApi/bookmarksApi";
import { isValidURL } from "../../utils/url";

export const AddBookmark = (props) => {
  const { onSuccessCallback } = props;
  const nodeId = useSelector((state) => state.navigation.currentNodeId);
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
    await createBookmark(data.bookmarkTitle, data.url, nodeId)
      .then((results) => {
        if (results.title === data.bookmarkTitle) onSuccessCallback();
      })
      .catch((error) => {
        if (error) onSuccessCallback();
      });
  };

  return (
    <form onSubmit={form.onSubmit(addBookmark)}>
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
        Create
      </Button>
    </form>
  );
};
