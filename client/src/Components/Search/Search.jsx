import "./Search.css";
import { useState, useEffect, useContext } from "react";
import { DisplayContext } from "../../Context/DisplayContext";
import { getAllDogIds, getDogsWithIds, getBreedList, getNearbyLocations, getDogIdsByCriteria } from "../../api";

const Search = () => {
  const fetchURL = "https://frontend-take-home-service.fetch.com";
  const [dogBreeds, setDogBreeds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [criteria, setCriteria] = useState({});
  const { dogIds, setDogIds, breedFilter, setBreedFilter, setDogData, setNextPage, setPrevPage } =
    useContext(DisplayContext);

  async function filterBySearch(event) {
    console.log(event.target.value);
    setSearchQuery(event.target.value)
    // const res =  getResultsByCity(e.target.value)
    // console.log(await res);

  }

  // function fetchDogIdByCriteria() {
  //   console.log(criteria)
  //   if (!criteria) {
  //     console.log("no filter");
  //     fetch(fetchURL + "/dogs/search", {
  //       method: "GET",
  //       credentials: "include",
  //     })
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((data) => {
  //         // setTotal(data.total);
  //         setDogIds(data.resultIds);
  //         // setNextPage(data.next);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   } else if (criteria.type == "breed") {
  //     console.log("filtering by breed", criteria);
  //     // GET all dogs of a particular breed
  //     fetch(
  //       fetchURL +
  //         "/dogs/search?" +
  //         new URLSearchParams({
  //           breeds: criteria.res,
  //         }).toString(),
  //       {
  //         method: "GET",
  //         credentials: "include",
  //       }
  //     )
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((data) => {
  //         // setTotal(data.total);
  //         console.log("breed", data.resultIds);
  //         setDogIds(data.resultIds);
  //         setNextPage(data.next);
  //         setPrevPage(data.prev);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   } else if (criteria.type == "search") {
  //     const searchParams = new URLSearchParams();
  //     const zipCodeArr = Object.entries(criteria.res);
  //     for (let [key, value] of zipCodeArr) {
  //       searchParams.append("zipCodes", value)
  //     }
  //     fetch(
  //       fetchURL +
  //         "/dogs/search?" +
  //         searchParams.toString(),
  //       {
  //         method: "GET",
  //         credentials: "include",
  //       }
  //     )
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((data) => {
  //         // setTotal(data.total);
  //         console.log("search", data.resultIds);
  //         setDogIds(data.resultIds);
  //         setNextPage(data.next);
  //         setPrevPage(data.prev);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // }

  const filterByBreed = (event) => {
    setCriteria({"type": "breeds", "res":event.target.value});
    setBreedFilter(event.target.value)
  };

  useEffect(()=>{
    //Get nearby locations based on entered city
    if (searchQuery.length > 0){
      getNearbyLocations(searchQuery)
      .then((response) => {return response.text()})
      .then((data) => {setCriteria({"type": "search", "res": JSON.parse(data).results.map((e)=>e.zip_code)})})
      .catch((error) => {console.error(error)});
    }
  }, [searchQuery])

  useEffect(() => {
    // Get the list of dog breeds
    getBreedList()
    .then((res)=>{return res.json()})
    .then((data)=>{setDogBreeds(data)})
    .catch((error)=>{console.error(error)})

  }, []);

  useEffect(()=>{
    // fetchDogIdByCriteria();
    console.log(criteria)
    if (Object.keys(criteria) == 0) {
      getAllDogIds()
      .then((data)=>{
        setDogIds(data.resultIds);
        setNextPage(data.next);
        setPrevPage(data.prev);
      })
      .catch((error)=>{console.error(error)})
    } else {
      if (criteria.type == "breeds") {
        document.getElementById('search-filter').value = null;
      }
      getDogIdsByCriteria(criteria)
      .then((res)=>{return res.json()})
      .then((data)=>{
        console.log(data)
        setDogIds(data.resultIds);
        setNextPage(data.next);
        setPrevPage(data.prev);
      })
      .catch((error)=>{console.error(error)})
    }
  }, [criteria])

  return (
    <div className="search-section">
      <input id="search-filter" onChange={filterBySearch} type="text" className="search-input" placeholder="Type in a city" />
      <div className="filter-sort">
        <select id="sortOrder">
          <option value="">Ascending Order</option>
          <option value="descending">Descending Order</option>
        </select>
        <select id="breed-filter" value={criteria.type == "breeds" ? breedFilter : ""} onChange={filterByBreed}>
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
  );
};

export default Search;
