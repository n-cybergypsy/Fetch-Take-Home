import "./DogDisplay.css";
import { useState, useContext, useEffect } from "react";
import Tile from "../Tile/Tile";
import Next from "../Assets/next-icon.png";
import Back from "../Assets/back-icon.png";
import { DisplayContext } from "../../Context/DisplayContext";
import { UserContext } from "../../Context/UserContext";
import { getDogsWithIds} from "../../api";

const DogDisplay = (props) => {
  const fetchURL = "https://frontend-take-home-service.fetch.com";

  const { dogData, setDogData, setDogIds, prevPages, nextPage, totalResults, setNextPage, setPrevPages, setTotalResults } = useContext(DisplayContext);
  const { setCurrUser } = useContext(UserContext);
  const [isEmpty, setIsEmpty] = useState(true)

    const fetchPrevious = () => {
      const lastPage = prevPages.pop()
      fetch(fetchURL + lastPage, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.prev) {if (data.prev) {setPrevPages([...prevPages, data.prev])}([...prevPages, data.prev])}
          setDogIds(data.resultIds);
          setNextPage(data.next);
          setTotalResults(data.total)
        })
        .catch((error) => {
          console.error(error);
        });
    }
    const fetchNext = () => {
      fetch(fetchURL + nextPage, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.prev) {setPrevPages([...prevPages, data.prev])}([...prevPages, data.prev]);
          setDogIds(data.resultIds);
          setNextPage(data.next);
          setTotalResults(data.total)
        })
        .catch((error) => {
          console.error(error);
        });
    }

  useEffect(()=>{
      setDogData([])
      if (props.dogIds.length > 0){
        setIsEmpty(false)
        getDogsWithIds(props.dogIds)
          .then((res)=>{
            if (res.status == 401) {
              setCurrUser(null)
            }
            return res.text()})
          .then((data)=>{ setDogData(JSON.parse(data))})
          .catch((error)=>{console.error(error)})
      } else {
        setIsEmpty(true)
      }
  }, [props.dogIds])

  return (
      <div className="dog-display">
        {!isEmpty &&
          dogData.map((dog, i) => {
            
            return (
              <Tile
                id={dog.id}
                key={i}
                img={dog.img}
                name={dog.name}
                age={dog.age}
                breed={dog.breed}
                zip_code={dog.zip_code}
              />
            );
          })}
          {(!isEmpty && props.page != "favorites") &&
          <div className="change-page">
            <div className="change-page-button">
              {prevPages.length > 0 ? <button onClick={()=>{fetchPrevious()}}><img src={Back}/></button> : <div></div>}
            </div>
            <div className="change-page-button">
              {totalResults > ((prevPages.length + 1)*25) ? <button onClick={()=>{fetchNext()}}><img src={Next}/></button> : <div></div>}
            </div>
          </div>
          }
          {isEmpty && <h2>No doggos to show :(</h2>}

          
      </div>
  );
};

export default DogDisplay;
