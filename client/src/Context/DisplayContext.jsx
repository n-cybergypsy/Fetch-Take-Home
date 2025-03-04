import { useState, createContext } from "react";

export const DisplayContext = createContext(null);

const DisplayContextProvider = (props) => {
  const [dogIds, setDogIds] = useState([]);
  const [favoriteDogs, setFavoriteDogs] = useState(new Set());
  const [filterBy, setFilterBy] = useState(null);
  const [sortBy, setSortBy] = useState("ascending");
  const [breedFilter, setBreedFilter] = useState("");
  const [dogData, setDogData] = useState([]);
  const [favoriteDogData, setFavoriteDogData] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  

  const contextValue = {
    filterBy,
    setFilterBy,
    sortBy,
    setSortBy,
    breedFilter,
    setBreedFilter,
    dogIds,
    setDogIds,
    favoriteDogs,
    setFavoriteDogs,
    dogData,
    setDogData,
    favoriteDogData,
    setFavoriteDogData,
    nextPage,
    setNextPage,
    prevPage,
    setPrevPage,
  };

  return (
    <DisplayContext.Provider value={contextValue}>
      {props.children}
    </DisplayContext.Provider>
  );
};

export default DisplayContextProvider;
