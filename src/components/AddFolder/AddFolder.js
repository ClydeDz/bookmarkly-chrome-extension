import { useForm } from "@mantine/form";
import { TextInput, Button } from "@mantine/core";
import { useSelector } from "react-redux";
import { createFolder } from "../../api/bookmarksApi/bookmarksApi";

export const AddFolder = (props) => {
  const { onSuccessCallback } = props;
  const nodeId = useSelector((state) => state.navigation.currentNodeId);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { folderName: "" },
    validate: {
      folderName: (value) => (!value ? "Folder name cannot be empty" : null),
    },
  });

  const addFolder = async (data) => {
    await createFolder(data.folderName, nodeId)
      .then((results) => {
        if (results.title === data.folderName) onSuccessCallback();
      })
      .catch((error) => {
        if (error) onSuccessCallback();
      });
  };

  return (
    <form onSubmit={form.onSubmit(addFolder)}>
      <TextInput
        label="Folder name"
        key={form.key("folderName")}
        {...form.getInputProps("folderName")}
      />
      <Button type="submit" mt="sm">
        Create
      </Button>
    </form>
  );
};
