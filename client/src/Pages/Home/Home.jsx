import Search from "../../Components/Search/Search";
import DogDisplay from "../../Components/DogDisplay/DogDisplay";
import "./Home.css";
import { useEffect, useContext} from "react";
import { DisplayContext } from "../../Context/DisplayContext";
import { UserContext } from "../../Context/UserContext";
import { getAllDogIds } from "../../api";


const Home = () => {
  const { dogIds } = useContext(DisplayContext);

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
