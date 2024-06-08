import { useEffect, useState } from "react";
import { BookmarkEventsContext } from "../context/BookmarkEventsContext";
import {
  getBookmarksTree,
  onBookmarkOrFolderChanged,
  onBookmarkOrFolderCreated,
  onBookmarkOrFolderMoved,
  onBookmarkOrFolderRemoved,
  onBookmarkOrFolderReordered,
  onImportSessionEnded,
} from "../api/bookmarksApi/bookmarksApi";

export const BookmarkEventsProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState(null);

  const loadAppData = async () => {
    setBookmarks(await getBookmarksTree());
  };

  useEffect(() => {
    loadAppData();
    onBookmarkOrFolderCreated(loadAppData);
    onBookmarkOrFolderRemoved(loadAppData);
    onBookmarkOrFolderMoved(loadAppData);
    onImportSessionEnded(loadAppData);
    onBookmarkOrFolderReordered(loadAppData);
    onBookmarkOrFolderChanged(loadAppData);
  }, []);

  return (
    <BookmarkEventsContext.Provider value={bookmarks}>
      {children}
    </BookmarkEventsContext.Provider>
  );
};
