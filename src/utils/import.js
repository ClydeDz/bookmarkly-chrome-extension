import { bookmarksToJSON } from "bookmarks-to-json";
import { createBookmark, createFolder } from "../api/bookmarksApi/bookmarksApi";
import {
  BOOKMARK_TYPES,
  DEFAULT_BOOKMARKS_FOLDER,
  DEFAULT_BOOKMARKS_NODE_ID,
  TOAST_TYPE,
} from "../const/app";

export const onFileUpload = async (e, showToast) => {
  const file = e.target.files[0];
  const { name } = file;
  const fileExtension = name.substr(name.lastIndexOf(".") + 1);

  if (!file) return;

  if (fileExtension !== "html") {
    showToast({
      title: "Incorrect file format",
      message: `Imported file must be an HTML file`,
      type: TOAST_TYPE.FAILURE,
    });
    return;
  }

  const reader = new FileReader();

  reader.onload = async function (e) {
    try {
      const htmlContent = e.target.result;
      const options = {
        formatJSON: false,
        spaces: 2,
      };
      const b2Json = bookmarksToJSON(htmlContent, options);
      await importBookmarks(JSON.parse(b2Json));

      showToast({
        title: "Success",
        message: `Bookmarks have been imported successfully`,
        type: TOAST_TYPE.SUCCESS,
      });
    } catch {
      showToast({
        title: "Apologies",
        message: `There was an issue importing bookmarks`,
        type: TOAST_TYPE.FAILURE,
      });
    }
  };
  reader.readAsText(file);
};

const importBookmarks = async (
  bookmarks,
  parentId = DEFAULT_BOOKMARKS_NODE_ID
) => {
  bookmarks.map(async (bookmark) => {
    if (bookmark.type === BOOKMARK_TYPES.FOLDER) {
      let newFolder;

      if (bookmark.title !== DEFAULT_BOOKMARKS_FOLDER) {
        newFolder = await createFolder(bookmark.title, parentId);
      }

      const doesFolderContainBookmarks =
        bookmark.children && bookmark.children.length > 0;

      if (!doesFolderContainBookmarks) return null;

      const currentParentId =
        bookmark.title === DEFAULT_BOOKMARKS_FOLDER
          ? DEFAULT_BOOKMARKS_NODE_ID
          : newFolder.id;
      importBookmarks(bookmark.children, currentParentId);
      return null;
    }

    await createBookmark(bookmark.title, bookmark.url, parentId);
  });
};
