import { Menu, rem, Button } from "@mantine/core";
import {
  IconUpload,
  IconDownload,
  IconDotsVertical,
} from "@tabler/icons-react";
import React from "react";
import { exportBookmarks } from "../../utils/export";
import { useToast } from "../../hooks/useToast";
import { onFileUpload } from "../../utils/import";

export const HeaderMenu = () => {
  const { showToast } = useToast();
  const inputFileRef = React.useRef();

  const onImportClick = () => {
    inputFileRef.current.click();
  };

  const onExportClick = async () => {
    await exportBookmarks(showToast);
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button aria-label="Settings" size="compact-md" variant="light" ml={9}>
          <IconDotsVertical color="white" />
        </Button>
      </Menu.Target>

      <input
        type="file"
        id="fileUpload"
        ref={inputFileRef}
        accept=".html"
        hidden
        onChange={(e) => onFileUpload(e, showToast)}
      />

      <Menu.Dropdown>
        <Menu.Item
          leftSection={
            <IconUpload style={{ width: rem(14), height: rem(14) }} />
          }
          onClick={onImportClick}
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
