import { NavLink } from "@mantine/core";
import { AppContext } from "../../state/context/AppContext";
import { useContext } from "react";
import { DEFAULT_BOOKMARKS_FOLDER } from "../../const/app";
import { truncateString } from "../../utils/string";

const renderNavItems = (menuItem) => {
  if (Array.isArray(menuItem)) {
    return menuItem.map((item) => {
      if (item.children && item.children.length > 0) {
        return (
          <NavLink
            label={truncateString(item.title, 26)}
            href="#"
            key={item.title}
            defaultOpened={item.title === DEFAULT_BOOKMARKS_FOLDER}
          >
            {renderNavItems(item.children)}
          </NavLink>
        );
      }

      return (
        <NavLink
          label={truncateString(item.title, 26)}
          href="#"
          key={item.title}
          noWrap={false}
        />
      );
    });
  }
};

export const BookmarkLinks = () => {
  const bookmarks = useContext(AppContext);

  if (!bookmarks) return <></>;

  return renderNavItems(bookmarks[0].children);
};
