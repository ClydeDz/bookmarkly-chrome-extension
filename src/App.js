import "./App.css";
import { PopulatedPage } from "./pages/PopulatedPage/PopulatedPage";
import { Provider } from "react-redux";
import { store } from "./state/redux/store";
import { Header } from "./components/Header/Header";
import { ToastProvider } from "./provider/ToastProvider";
import { BookmarkEventsProvider } from "./provider/BookmarkEventsProvider";
import { Footer } from "./components/Footer/Footer";

function App() {
  return (
    <Provider store={store}>
      <BookmarkEventsProvider>
        <ToastProvider>
          <Header />
          <PopulatedPage />
          <Footer />
        </ToastProvider>
      </BookmarkEventsProvider>
    </Provider>
  );
}

export default App;
