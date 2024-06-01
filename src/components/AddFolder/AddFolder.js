import { useForm } from "@mantine/form";
import { TextInput, Button } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import {
  createFolder,
  getInfoAboutNodeId,
  updateFolder,
} from "../../api/bookmarksApi/bookmarksApi";
import { useEffect } from "react";
import { setItemId } from "../../state/redux/navigationSlice";

export const AddFolder = (props) => {
  const { onSuccessCallback } = props;
  const { currentNodeId, itemId } = useSelector((state) => state.navigation);
  const dispatch = useDispatch();

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
        if (error) onSuccessCallback();
      });
  };

  const editFolder = async (data) => {
    await updateFolder(itemId, data.folderName)
      .then((results) => {
        if (results.title === data.folderName) {
          dispatch(setItemId(undefined));
          onSuccessCallback();
        }
      })
      .catch((error) => {
        if (error) onSuccessCallback();
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
    <form onSubmit={form.onSubmit(itemId ? editFolder : addFolder)}>
      <TextInput
        label="Folder name"
        key={form.key("folderName")}
        {...form.getInputProps("folderName")}
      />
      <Button type="submit" mt="sm">
        {itemId ? "Edit folder" : "Add folder"}
      </Button>
    </form>
  );
};
