import { useState, createContext } from "react";

export const DisplayContext = createContext(null);

const DisplayContextProvider = (props) => {
  const [dogIds, setDogIds] = useState([]);
  const [favoriteDogs, setFavoriteDogs] = useState(new Set());
  const [breedFilter, setBreedFilter] = useState("");
  const [dogData, setDogData] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [nextPage, setNextPage] = useState(null);
  const [prevPages, setPrevPages] = useState([]);

  

  const contextValue = {
    breedFilter,
    setBreedFilter,
    dogIds,
    setDogIds,
    favoriteDogs,
    setFavoriteDogs,
    dogData,
    setDogData,
    nextPage,
    setNextPage,
    prevPages,
    setPrevPages,
    totalResults,
    setTotalResults,
  };

  return (
    <DisplayContext.Provider value={contextValue}>
      {props.children}
    </DisplayContext.Provider>
  );
};

export default DisplayContextProvider;
