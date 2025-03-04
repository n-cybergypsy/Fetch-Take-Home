import "./DogDisplay.css";
import { useState, useContext, useEffect } from "react";
import Tile from "../Tile/Tile";
import { DisplayContext } from "../../Context/DisplayContext";
import { UserContext } from "../../Context/UserContext";
import { getDogsWithIds} from "../../api";

const DogDisplay = (props) => {
  const fetchURL = "https://frontend-take-home-service.fetch.com";

  const { dogIds, dogData, setDogData, } = useContext(DisplayContext);
  const { favoriteDogs } = useContext(UserContext);

  // function fetchDogsWithId() {
  //   fetch(fetchURL + "/dogs", {
  //     method: "POST",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(props.dogIds),
  //   })
  //     .then((response) => {
  //       console.log(response);
  //       // if (!response.ok){
  //       //   const err = new Error()
  //       //   err.code = response.status
  //       //   throw err
  //       // }
  //       return response.text();
  //     })
  //     .then((data) => {
  //       setDogData(JSON.parse(data));
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       // if (error.code == 401)
  //     });
  // }

  useEffect(()=>{
    if (props.dogIds){
      getDogsWithIds(props.dogIds)
        .then((res)=>{return res.text()})
        .then((data)=>{setDogData(JSON.parse(data))})
        .catch((error)=>{console.error(error)})
    }
  }, [props.dogIds])

  return (
      <div className="dog-display">
        {dogData &&
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
                favorited = {favoriteDogs ? favoriteDogs.includes(dog.id) : false}
              />
            );
          })}
          
      </div>
  );
};

export default DogDisplay;
