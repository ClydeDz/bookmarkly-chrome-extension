import "./App.css";
import { useEffect, useState } from "react";
import { PopulatedPage } from "./pages/PopulatedPage/PopulatedPage";
import { AppContext } from "./state/context/AppContext";
import { getBookmarksTree } from "./api/bookmarksApi/bookmarksApi";
import { Provider } from "react-redux";
import { store } from "./state/redux/store";
import { Header } from "./components/Header/Header";

function App() {
  const [bookmarks, setBookmarks] = useState(null);

  const loadAppData = async () => {
    setBookmarks(await getBookmarksTree());
  };

  useEffect(() => {
    loadAppData();
  }, []);

  // const results = await chrome.bookmarks.getRecent(4);
  // console.log(results);

  return (
    <Provider store={store}>
      <AppContext.Provider value={bookmarks}>
        <Header />
        <PopulatedPage />
      </AppContext.Provider>
    </Provider>
  );
}

export default App;
