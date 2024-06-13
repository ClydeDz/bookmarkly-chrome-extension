import { useForm } from "@mantine/form";
import { TextInput, Button } from "@mantine/core";
import { useSelector } from "react-redux";
import {
  createFolder,
  getInfoAboutNodeId,
  updateFolder,
} from "../../api/bookmarksApi/bookmarksApi";
import { useEffect } from "react";
import { ACTION_TYPE } from "../../const/app";

export const AddFolder = (props) => {
  const { onSuccessCallback, onFailureCallback } = props;
  const { currentNodeId, itemId } = useSelector((state) => state.navigation);
  const drawerType = useSelector((state) => state.drawer.drawerType);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: { folderName: "" },
    validate: {
      folderName: (value) => (!value ? "Folder name cannot be empty" : null),
    },
  });

  const addFolder = async (data) => {
    await createFolder(data.folderName, currentNodeId)
      .then((results) => {
        if (results.title === data.folderName) onSuccessCallback();
      })
      .catch((error) => {
        if (error) onFailureCallback();
      });
  };

  const editFolder = async (data) => {
    await updateFolder(itemId, data.folderName)
      .then((results) => {
        if (results.title === data.folderName) onSuccessCallback();
      })
      .catch((error) => {
        if (error) onFailureCallback();
      });
  };

  const initializeValues = async () => {
    const itemDetails = await getInfoAboutNodeId(itemId);
    if (!itemDetails) return;

    form.setValues({ folderName: itemDetails[0].title });
  };

  useEffect(() => {
    itemId && initializeValues();
  }, [itemId]);

  return (
    <form
      onSubmit={form.onSubmit(
        drawerType === ACTION_TYPE.ADD_FOLDER ? addFolder : editFolder
      )}
    >
      <TextInput
        label="Folder name"
        key={form.key("folderName")}
        {...form.getInputProps("folderName")}
      />
      <Button type="submit" mt="sm">
        {drawerType === ACTION_TYPE.ADD_FOLDER ? "Add" : "Update"}
      </Button>
    </form>
  );
};
