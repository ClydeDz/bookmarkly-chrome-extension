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

  if (!file) return;

  const reader = new FileReader();

  reader.onload = async function (e) {
    try {
      const htmlContent = e.target.result;
      const b2Json = bookmarksToJSON(htmlContent, {});
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
