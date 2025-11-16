import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchAge, setSearchAge] = useState("");

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, searchType, setSearchType, searchAge, setSearchAge }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
