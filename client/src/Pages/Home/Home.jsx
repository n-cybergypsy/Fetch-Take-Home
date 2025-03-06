import Search from "../../Components/Search/Search";
import DogDisplay from "../../Components/DogDisplay/DogDisplay";
import "./Home.css";
import { useEffect, useContext} from "react";
import { DisplayContext } from "../../Context/DisplayContext";
import { UserContext } from "../../Context/UserContext";
import { getAllDogIds } from "../../api";


const Home = () => {
  const { dogIds } = useContext(DisplayContext);

  // useEffect(()=>{
  //   getAllDogIds("asc")
  //   .then((res)=>{return res.json()})
  //   .then((data)=>{
  //     setDogIds(data.resultIds);
  //     setNextPage(data.next);
  //     if (data.prev) {setPrevPages([...prevPages, data.prev])}([...prevPages, data.prev]);
  //     setTotalResults(data.total)
  //   })
  //   .catch((error)=>{console.error(error)})
  // }, [])
  return (
    <div className="home-page">
      <h1>SHELTERED DOG DATABASE</h1>
      <Search />
      <div className="display-area">
        <DogDisplay dogIds={dogIds}/>
      </div>
    </div>
  );
};

export default Home;
