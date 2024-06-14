import { Menu, rem, Button } from "@mantine/core";
import {
  IconUpload,
  IconDownload,
  IconDotsVertical,
} from "@tabler/icons-react";
import React from "react";
import { convertJsonToHtml } from "../../utils/export";

const onImportClick = () => {
  try {
    chrome.tabs.create({ url: "chrome://settings/importData" });
  } catch {
    alert("To import data, please go to: chrome://settings/importData");
  }
};

const onExportClick = async () => {
  async function downloadInnerHtml(filename, elId, mimeType) {
    var elHtml = await convertJsonToHtml();

    // Create a Blob and save it as an HTML file
    // let blob = new Blob([html], { type: "text/html" });
    // let url = URL.createObjectURL(blob);
    // let a = document.createElement("a");
    // a.href = url;
    // a.download = "bookmarks.html";
    // a.click();
    // URL.revokeObjectURL(url);

    console.log(elHtml);
    var link = document.createElement("a");
    mimeType = mimeType || "text/plain";

    link.setAttribute("download", filename);
    link.setAttribute(
      "href",
      "data:" + mimeType + ";charset=utf-8," + encodeURIComponent(elHtml)
    );
    link.click();
  }

  var fileName = "tags.html"; // You can use the .txt extension if you want
  await downloadInnerHtml(fileName, "main", "text/html");
};

export const HeaderMenu = () => {
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
