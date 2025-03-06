import "./Dog.css";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DisplayContext } from "../../Context/DisplayContext";
import { UserContext } from "../../Context/UserContext";
import { getDogsWithIds } from "../../api";

const Dog = () => {
  const { dogData } = useContext(DisplayContext);
  const { setCurrUser } = useContext(UserContext);
  const { dogId } = useParams();
  const [dog, setDog] = useState(null);

  useEffect(()=>{
    getDogsWithIds([dogId])
      .then((res)=>{
        if (res.status == 401) {
          setCurrUser(null)
        }
        return res.text()})
      .then((data)=>{ setDog(JSON.parse(data)[0])})
      .catch((error)=>{console.error(error)})
  }, [])


  return (
    dog && (
      <div className="dog-page">
        <div className="dog-data-container">
          <div className="dog-img-container">
            <img src={dog.img} />
          </div>
          <div className="dog-details">
            <p>Hi, my name is {dog.name}!</p>
            <p>I am a {dog.age} year(s) old {dog.breed} and I would love for you to become my fur-ever home!</p>
          </div>
        </div>
      </div>
    )
  );
};

export default Dog;
