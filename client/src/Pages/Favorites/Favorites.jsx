import "./Favorites.css"
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { DisplayContext } from "../../Context/DisplayContext";
import DogDisplay from "../../Components/DogDisplay/DogDisplay";
import { getDogsWithIds, getMatch } from "../../api";
import Tile from "../../Components/Tile/Tile";


const Favorites = () => {
  const { favoriteDogs } = useContext(UserContext);
  const { setDogIds } = useContext(DisplayContext);
  const [dogMatch, setDogMatch] = useState(null);
  const [matchData, setMatchData] = useState(null);
  const fetchURL = "https://frontend-take-home-service.fetch.com";
  
  const doMatch = () => {
    getMatch(favoriteDogs)
      .then((res) => { return res.json()})
      .then((data) => {setDogMatch([data.match]);})
      .catch((error) => {console.error(error);});
  }

  useEffect(()=>{
    getDogsWithIds(dogMatch).then((response) => {return response.text();})
    .then((data) => {setMatchData(JSON.parse(data)[0]);})
    .catch((error) => {console.error(error);});
  }, [dogMatch])

  useEffect(()=>{
    setDogIds(favoriteDogs)
  }, [])
  return (
    <div className="favorite-display-area">
      <div className="match-btn">
        <button onClick={()=>{doMatch()}}>Match Me!</button>
      </div>
      {matchData && 
        <div className="favorite-match-display">
          <div className="dog-display">
            <h1>Your Matched Dog:</h1>
            <Tile
              id={matchData.id}
              img={matchData.img}
              name={matchData.name}
              age={matchData.age}
              breed={matchData.breed}
            />
          </div>
        </div>
      }
      {favoriteDogs && 
      <div className="favorite-dog-display">
        <h1>Your Favorite Dogs:</h1>
        <DogDisplay dogIds={favoriteDogs}/>
      </div>
        }
      {!favoriteDogs && 
        <div>
          <h1>You haven't favorited any doggos :(</h1>
          <Link to="/">Go back favorite some dogs!</Link>
        </div>}

    </div>
  );
};

export default Favorites;
