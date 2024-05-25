import "./App.css";
import { useEffect, useState } from "react";
import { PopulatedPage } from "./pages/PopulatedPage/PopulatedPage";
import { AppContext } from "./state/context/AppContext";
import { getBookmarksTree } from "./api/bookmarksApi/bookmarksApi";

function App() {
  const [bookmarks, setBookmarks] = useState(null);

  useEffect(() => {
    setBookmarks(getBookmarksTree());
  }, []);

  // chrome.bookmarks.getTree((results) => {
  //   console.log(results);
  // });

  return (
    <AppContext.Provider value={bookmarks}>
      <PopulatedPage />
    </AppContext.Provider>
  );
}

export default App;
