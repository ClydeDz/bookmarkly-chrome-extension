import "./App.css";
import { useEffect, useState } from "react";
import { PopulatedPage } from "./pages/PopulatedPage/PopulatedPage";
import { AppContext } from "./state/context/AppContext";
import {
  getBookmarksTree,
  onBookmarkOrFolderChanged,
  onBookmarkOrFolderCreated,
  onBookmarkOrFolderMoved,
  onBookmarkOrFolderRemoved,
  onBookmarkOrFolderReordered,
  onImportSessionEnded,
} from "./api/bookmarksApi/bookmarksApi";
import { Provider } from "react-redux";
import { store } from "./state/redux/store";
import { Header } from "./components/Header/Header";
import { ToastProvider } from "./state/context/ToastContext";

function App() {
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
    <Provider store={store}>
      <AppContext.Provider value={bookmarks}>
        <ToastProvider>
          <Header />
          <PopulatedPage />
        </ToastProvider>
      </AppContext.Provider>
    </Provider>
  );
}

export default App;
