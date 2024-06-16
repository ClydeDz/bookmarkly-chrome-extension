import { getBookmarksTree } from "../api/bookmarksApi/bookmarksApi";
import {
  DEFAULT_BOOKMARKS_FOLDER,
  MOBILE_BOOKMARKS_FOLDER,
  OTHER_BOOKMARKS_FOLDER,
  TOAST_TYPE,
} from "../const/app";

export const exportBookmarks = async (showToast) => {
  try {
    var html = await convertJsonToHtml();
    downloadHtmlFile(html);

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

const downloadHtmlFile = (html) => {
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "bookmarkly.html";
  a.click();
  URL.revokeObjectURL(url);
};

const convertJsonToHtml = async () => {
  const data = await getBookmarksTree();

  let html = "<!DOCTYPE NETSCAPE-Bookmark-file-1>\n";
  html +=
    '<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">\n';
  html += "<TITLE>Bookmarks</TITLE>\n";
  html += "<H1>Bookmarks</H1>\n";
  html += traverseBookmarks(data);
  return html;
};

const traverseBookmarks = (nodes) => {
  let html = "<DL><p>\n";
  nodes.forEach((node) => {
    html += convertNodeToHTML(node);
  });
  html += "</DL><p>\n";
  return html;
};

const convertNodeToHTML = (node) => {
  let html = "";
  const isNodeBookmarkLink = !node.children;

  if (isNodeBookmarkLink) {
    html += `<DT><A HREF="${node.url}">${node.title}</A>\n`;
    return html;
  }

  const isDefaultEmptyFolder =
    (node.title === OTHER_BOOKMARKS_FOLDER ||
      node.title === MOBILE_BOOKMARKS_FOLDER) &&
    node.children.length < 1;

  if (isDefaultEmptyFolder) return html;

  const attributeForBookmarksBar =
    node.title === DEFAULT_BOOKMARKS_FOLDER
      ? `PERSONAL_TOOLBAR_FOLDER="true"`
      : ``;

  html +=
    node.title && `<DT><H3 ${attributeForBookmarksBar}>${node.title}</H3>\n`;
  html += "<DL><p>\n";
  node.children.forEach((child) => {
    html += convertNodeToHTML(child);
  });
  html += "</DL><p>\n";

  return html;
};
