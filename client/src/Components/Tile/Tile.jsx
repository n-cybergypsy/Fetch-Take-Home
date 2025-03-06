import "./Tile.css";
import { useContext, useEffect, useState } from "react";
import { DisplayContext } from "../../Context/DisplayContext";
import { Link } from "react-router-dom";
import FilledHeart from "../Assets/favorite-filled.png";
import UnfilledHeart from "../Assets/favorite24.png";
import { addToFavorites, getFavorites, removeFromFavorites } from "../../api";
import { UserContext } from "../../Context/UserContext";

const Tile = (props) => {
  const { currUser, favoriteDogs} = useContext(UserContext);
  const [favorited, setFavorited] = useState(favoriteDogs.includes(props.id));
  const [heartState, setHeartState] = useState(UnfilledHeart);

  const handleFavorite = async () => {
    if (!favorited) {
      addToFavorites(currUser, props.id);
      setFavorited(true)
    } else {
      removeFromFavorites(currUser, props.id)
      setFavorited(false)
    }
  };

  useEffect(() => {
    if (favorited) {setHeartState(FilledHeart)} else {setHeartState(UnfilledHeart)}
  }, [favorited]);
  return (
    <div className="tile-container">
      <div className="tile">
        <Link to={`/dog/${props.id}`}>
          <div className="dog-img-container">
            <img src={props.img} />
          </div>
          <div className="dog-details">
            <h2>{props.name}</h2>
            <p>Age: {props.age} year(s) old</p>
            <p>Breed: {props.breed}</p>
            <p>Zip code: {props.zip_code}</p>
          </div>
        </Link>
        <div className="favorite-dog">
          <button
            className="favorite-dog-btn"
            onClick={() => {
              handleFavorite();
            }}
          >
            <img src={heartState} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tile;
