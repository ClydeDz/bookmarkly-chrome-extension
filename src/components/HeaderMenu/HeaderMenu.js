import { Menu, rem, Button } from "@mantine/core";
import {
  IconUpload,
  IconDownload,
  IconDotsVertical,
} from "@tabler/icons-react";
import React from "react";
import { convertJsonToHtml } from "../../utils/export";
import { useToast } from "../../hooks/useToast";
import { TOAST_TYPE } from "../../const/app";

const onImportClick = () => {
  try {
    chrome.tabs.create({ url: "chrome://settings/importData" });
  } catch {
    alert("To import data, please go to: chrome://settings/importData");
  }
};

export const HeaderMenu = () => {
  const { showToast } = useToast();
  const onExportClick = async () => {
    try {
      var html = await convertJsonToHtml();
      let blob = new Blob([html], { type: "text/html" });
      let url = URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.href = url;
      a.download = "bookmarkly.html";
      a.click();
      URL.revokeObjectURL(url);
      showToast({
        title: "Success",
        message: `Bookmarks have been exported successfully`,
        type: TOAST_TYPE.SUCCESS,
      });
    } catch {
      showToast({
        title: "Apologies",
        message: `There was an issue exporting bookmarks`,
        type: TOAST_TYPE.FAILURE,
      });
    }
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button aria-label="Settings" size="compact-md" variant="light" ml={9}>
          <IconDotsVertical color="white" />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          onClick={onImportClick}
          leftSection={
            <IconUpload style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Import
        </Menu.Item>
        <Menu.Item
          onClick={onExportClick}
          leftSection={
            <IconDownload style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Export
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
