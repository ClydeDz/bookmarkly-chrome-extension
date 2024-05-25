import { NavLink } from "@mantine/core";
import { AppContext } from "../../state/context/AppContext";
import { useContext } from "react";
import { DEFAULT_BOOKMARKS_FOLDER } from "../../const/app";
import { truncateString } from "../../utils/string";
import { useDispatch } from "react-redux";
import { setCurrentNodeId } from "../../state/redux/navigationSlice";

export const BookmarkLinks = () => {
  const bookmarks = useContext(AppContext);
  const dispatch = useDispatch();

  const onMenuItemClick = (nodeId) => {
    dispatch(setCurrentNodeId(nodeId));
  };

  const doesChildrenContainFolders = (item) => {
    if (item.children.length < 1) return false;

    return item.children.some((child) => !child.url);
  };

  const renderNavItems = (menuItem) => {
    if (Array.isArray(menuItem)) {
      return menuItem.map((item) => {
        if (!item.children) return;

        if (doesChildrenContainFolders(item)) {
          return (
            <NavLink
              label={truncateString(item.title, 26)}
              href="#"
              key={item.title}
              defaultOpened={item.title === DEFAULT_BOOKMARKS_FOLDER}
              onClick={() => onMenuItemClick(item.id)}
            >
              {renderNavItems(item.children)}
            </NavLink>
          );
        } else {
          return (
            <NavLink
              label={truncateString(item.title, 26)}
              href="#"
              key={item.title}
              onClick={() => onMenuItemClick(item.id)}
            />
          );
        }

        // return (
        //   <NavLink
        //     label={truncateString(item.title, 26)}
        //     href="#"
        //     key={item.title}
        //     noWrap={false}
        //   />
        // );
      });
    }
  };

  if (!bookmarks) return <></>;

  return renderNavItems(bookmarks[0].children);
};
