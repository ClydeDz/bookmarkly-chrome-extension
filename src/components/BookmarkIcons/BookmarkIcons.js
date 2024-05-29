import {
  IconClockFilled,
  IconBookmarkFilled,
  IconStarFilled,
  IconDeviceMobile,
} from "@tabler/icons-react";
import {
  DEFAULT_BOOKMARKS_FOLDER,
  MOBILE_BOOKMARKS_FOLDER,
  OTHER_BOOKMARKS_FOLDER,
  RECENT_BOOKMARKS_FOLDER,
} from "../../const/app";

export const BookmarkIcons = (props) => {
  const { bookmarkLabel } = props;

  switch (bookmarkLabel) {
    case DEFAULT_BOOKMARKS_FOLDER:
      return <IconBookmarkFilled size={14} />;
    case RECENT_BOOKMARKS_FOLDER:
      return <IconClockFilled size={14} />;
    case MOBILE_BOOKMARKS_FOLDER:
      return <IconDeviceMobile size={14} />;
    case OTHER_BOOKMARKS_FOLDER:
      return <IconStarFilled size={14} />;
    default:
      return <></>;
  }
};
