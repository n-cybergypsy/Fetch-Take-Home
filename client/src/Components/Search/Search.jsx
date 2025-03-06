import "./Search.css";
import { useState, useEffect, useContext } from "react";
import { DisplayContext } from "../../Context/DisplayContext";
import { CiSearch } from "react-icons/ci";
import { getAllDogIds, getDogsWithIds, getBreedList, getNearbyLocations, getDogIdsByCriteria } from "../../api";
import { UserContext } from "../../Context/UserContext";

const Search = () => {
  const fetchURL = "https://frontend-take-home-service.fetch.com";
  const [dogBreeds, setDogBreeds] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc")
  const [breedCriteria, setBreedCriteria] = useState("");
  const [searchCriteria, setSearchCriteria] = useState({});
  const { dogIds, setDogIds, setBreedFilter, setDogData, prevPages, setNextPage, setPrevPages, setTotalResults } =
    useContext(DisplayContext);
  const {setCurrUser} = useContext(UserContext)

  const changeSortOrder = (event) => {
    setSortOrder(event.target.value)
    setBreedCriteria("");
  };

  const filterByBreed = (event) => {
    setBreedCriteria(event.target.value);
    setBreedFilter(event.target.value)
  };

  useEffect(() => {
    // Get the list of dog breeds
    getBreedList()
    .then((res)=>{
      if (res.status == 401) {
        setCurrUser(null)
      }
      return res.json()
    })
    .then((data)=>{setDogBreeds(data)})
    .catch((error)=>{console.error(error)})

        const formElement = document.querySelector(".search-form");
    
        formElement.addEventListener("submit", (event) => {
          event.preventDefault();
          let searchQuery = document.getElementById("search-query").value;
          console.log(searchQuery)

          if (searchQuery.length > 0){
            getNearbyLocations(searchQuery)
            .then((response) => {return response.text()})
            .then((data) => {
              if (JSON.parse(data).total == 0){
                setDogIds([])
              } else {
                setSearchCriteria({"type": "search", "res": JSON.parse(data).results.map((e)=>e.zip_code)})
              }
            })
            .catch((error) => {console.error(error)});
          } else {
            setSearchCriteria({})
          }
          
        });

  }, []);

  useEffect(()=>{
    if (breedCriteria) {
      setSortOrder("asc");
    }
    if (breedCriteria || searchCriteria.res){
      getDogIdsByCriteria(breedCriteria, searchCriteria, sortOrder)
      .then((res)=>{ return res.json()})
      .then((data)=>{
        setDogIds(data.resultIds);
        setNextPage(data.next);
        if (data.prev) {setPrevPages([...prevPages, data.prev])}([...prevPages, data.prev]);
        setTotalResults(data.total)
      })
      .catch((error)=>{console.error(error)})
    } else {
      getAllDogIds(sortOrder)
      .then((res)=>{return res.json()})
        .then((data)=>{
          setDogIds(data.resultIds);
          setNextPage(data.next);
          if (data.prev) {setPrevPages([...prevPages, data.prev])}([...prevPages, data.prev]);
          setTotalResults(data.total)

        })
        .catch((error)=>{console.error(error)})
    }
    
  }, [breedCriteria, searchCriteria, sortOrder])

  return (
    <div className="search-section">
      <div className="search-section-container">
        <form className="search-form">
          <input id="search-query" type="text" className="search-input" placeholder="Type in the name of a city" />
          <button type="submit"><CiSearch/></button>
        </form>
        <div className="filter-sort">
          <select id="sort-order" value={sortOrder} onChange={changeSortOrder}>
            <option value="asc">Ascending Order</option>
            <option value="desc">Descending Order</option>
          </select>
          <select id="breed-filter" value={breedCriteria} onChange={filterByBreed}>
            <option value="">Breed</option>
            {dogBreeds.map((breed, idx) => {
              return (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Search;
