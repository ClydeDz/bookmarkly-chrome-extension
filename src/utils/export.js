import { getBookmarksTree } from "../api/bookmarksApi/bookmarksApi";

export const convertJsonToHtml = async () => {
  const data = await getBookmarksTree();

  let html = "<!DOCTYPE NETSCAPE-Bookmark-file-1>\n";
  html +=
    '<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">\n';
  html += "<TITLE>Bookmarks</TITLE>\n";
  html += "<H1>Bookmarks</H1>\n";
  html += traverseBookmarks(data);
  return html;
};

function traverseBookmarks(nodes) {
  let html = "<DL><p>\n";
  nodes.forEach((node) => {
    html += convertNodeToHTML(node);
  });
  html += "</DL><p>\n";
  return html;
}

function convertNodeToHTML(node) {
  let html = "";
  if (node.children) {
    if (
      (node.title === "Other bookmarks" || node.title === "Mobile bookmarks") &&
      node.children.length < 1
    ) {
      return html;
    }
    // Folder
    const isPersonal =
      node.title === "Bookmarks bar" ? `PERSONAL_TOOLBAR_FOLDER="true"` : ``;

    html += node.title && `<DT><H3 ${isPersonal}>${node.title}</H3>\n`;
    html += "<DL><p>\n";
    node.children.forEach((child) => {
      html += convertNodeToHTML(child);
    });
    html += "</DL><p>\n";
  } else {
    // Bookmark
    html += `<DT><A HREF="${node.url}">${node.title}</A>\n`;
  }
  return html;
}
