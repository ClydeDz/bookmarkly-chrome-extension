import { useEffect, useState } from "react";
import { BookmarkEventsContext } from "../context/BookmarkEventsContext";
import {
  registerOnChanged,
  registerOnCreated,
  registerOnMoved,
  registerOnRemoved,
  registerOnChildrenReordered,
  registerOnImportEnded,
} from "../api/bookmarksApi/bookmarksApi";

export const BookmarkEventsProvider = ({ children }) => {
  const [eventTriggered, setEventTriggered] = useState(false);

  const triggerEventChanges = async () => {
    setEventTriggered((prevState) => !prevState);
  };

  useEffect(() => {
    registerOnCreated(triggerEventChanges);
    registerOnRemoved(triggerEventChanges);
    registerOnMoved(triggerEventChanges);
    registerOnImportEnded(triggerEventChanges);
    registerOnChildrenReordered(triggerEventChanges);
    registerOnChanged(triggerEventChanges);
  }, []);

  return (
    <BookmarkEventsContext.Provider value={eventTriggered}>
      {children}
    </BookmarkEventsContext.Provider>
  );
};
