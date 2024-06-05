import { Autocomplete, Avatar, Group, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import { searchBookmarks } from "../../api/bookmarksApi/bookmarksApi";
import { AppContext } from "../../state/context/AppContext";
import { truncateString } from "../../utils/string";
import { IconFolder } from "@tabler/icons-react";

const convertObjectToKeyValuePair = (bookmarkData) => {
  const kv = {};

  const constructKeyValuePair = (_data) => {
    _data.map((item) => {
      item &&
        item.children &&
        item.children.length &&
        constructKeyValuePair(item.children);

      return (kv[item.title] = item);
    });
  };

  constructKeyValuePair(bookmarkData);

  return kv;
};

export const Search = () => {
  const bookmarks = useContext(AppContext);
  const [fullData, setFullData] = useState([]);
  const [onlyKeys, setOnlyKeys] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const setAutocompleteData = (_bookmarkData) => {
    const r = convertObjectToKeyValuePair(_bookmarkData);
    setFullData(r);

    const bookmarksGroupObject = { group: "Bookmarks", items: [] };
    const foldersGroupObject = { group: "Folders", items: [] };
    Object.entries(r).map((rItem) => {
      if (rItem[1].url) {
        bookmarksGroupObject.items.push(rItem[0]);
      } else {
        foldersGroupObject.items.push(rItem[0]);
      }
    });

    setOnlyKeys([{ ...bookmarksGroupObject }, { ...foldersGroupObject }]);
  };

  const fetchDataFromBackend = async () => {
    const results = await searchBookmarks(searchValue);
    if (!results || results.length === 0) setAutocompleteData([]);

    setAutocompleteData(results);
  };

  useEffect(() => {
    if (!bookmarks) return;
    setAutocompleteData(bookmarks[0].children);
  }, [bookmarks]);

  useEffect(() => {
    searchValue && fetchDataFromBackend();
    !searchValue && bookmarks && setAutocompleteData(bookmarks[0].children);
  }, [searchValue]);

  const renderAutocompleteOption = ({ option }) => {
    const optionItem = fullData[option.value];
    return (
      <Group
        gap="sm"
        key={option.title}
        onClick={() => console.log("tada", option)}
      >
        {optionItem.url ? (
          <Avatar
            src={`https://www.google.com/s2/favicons?domain=${optionItem.url}&sz=128`}
            size={36}
            radius="xl"
          />
        ) : (
          <Avatar size={36} radius="xl">
            <IconFolder />
          </Avatar>
        )}
        <div>
          <Text size="sm">{truncateString(optionItem.title, 26)}</Text>
          {optionItem.url && (
            <Text size="xs" opacity={0.5}>
              {truncateString(optionItem.url, 26)}
            </Text>
          )}
        </div>
      </Group>
    );
  };

  return (
    <Autocomplete
      data={onlyKeys}
      renderOption={renderAutocompleteOption}
      maxDropdownHeight={300}
      onOptionSubmit={console.log}
      size="md"
      w={450}
      maw={900}
      placeholder="Search"
      onChange={setSearchValue}
      leftSection={<IconSearch size={16} />}
    />
  );
};
