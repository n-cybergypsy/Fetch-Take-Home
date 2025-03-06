import "./Favorites.css"
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import DogDisplay from "../../Components/DogDisplay/DogDisplay";
import { getDogsWithIds, getFavorites, getMatch } from "../../api";
import Tile from "../../Components/Tile/Tile";


const Favorites = () => {
  const { favoriteDogs, setFavoriteDogs, currUser, setCurrUser } = useContext(UserContext);
  const [dogMatch, setDogMatch] = useState(null);
  const [matchData, setMatchData] = useState(null);
  
  const doMatch = () => {
    getMatch(favoriteDogs)
      .then((res) => { return res.json()})
      .then((data) => {setDogMatch([data.match]);})
      .catch((error) => {console.error(error);});
  }

  useEffect(()=>{
    if (dogMatch){
    getDogsWithIds(dogMatch).then((response) => {return response.text();})
    .then((data) => {setMatchData(JSON.parse(data)[0]);})
    .catch((error) => {console.error(error);});
    }
  }, [dogMatch])

  useEffect(()=>{
    //Refresh favorite dogs
    getFavorites(currUser)
      .then((res)=>{
        if (res.status == 401) {
          setCurrUser(null)
        }
        return res.json()
      })
      .then((data)=> {setFavoriteDogs(data.map((e)=>e.dog_id))})
      .catch((error)=>{console.error(error)})
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
        <DogDisplay page="favorites" dogIds={favoriteDogs}/>
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
