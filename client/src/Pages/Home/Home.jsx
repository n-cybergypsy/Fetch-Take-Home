import Search from "../../Components/Search/Search";
import DogDisplay from "../../Components/DogDisplay/DogDisplay";
import "./Home.css";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { DisplayContext } from "../../Context/DisplayContext";
import { UserContext } from "../../Context/UserContext";


const Home = () => {
  const { currUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { dogIds, setDogIds, nextPage, setNextPage, prevPage, setPrevPage } = useContext(DisplayContext);
  const fetchURL = "https://frontend-take-home-service.fetch.com";

  const fetchPrevious = () => {
    fetch(fetchURL + prevPage, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // setTotal(data.total);
        setPrevPage(data.prev);
        setDogIds(data.resultIds);
        setNextPage(data.next);
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
        setPrevPage(data.prev);
        setDogIds(data.resultIds);
        setNextPage(data.next);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(()=>{
    function fetchDogIdByCriteria() {
      console.log("no filter");
      fetch(fetchURL + "/dogs/search/?sort=breed:asc", {
        method: "GET",
        credentials: "include",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setDogIds(data.resultIds);
          setNextPage(data.next);
        })
        .catch((error) => {
          console.log("throw it back")
          console.error(error);
          if (error.status == 401)navigate('/login',{replace: true})
        });
    };
    fetchDogIdByCriteria()
    // if (!currUser) {
    //   navigate('/login',{replace: true})
  
    // }
  }, [])
  return (
    <div className="home-page">
      <Search />
      <div className="display-area">
        <DogDisplay dogIds={dogIds}/>
        <div className="change-page">
          {prevPage ? <button onClick={()=>{fetchPrevious()}}><GrPrevious /></button> : <div></div>}
          {nextPage ? <button onClick={()=>{fetchNext()}}><GrNext/></button> : <div></div>}
        </div>
      </div>
    </div>
  );
};

export default Home;
