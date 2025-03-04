import "./Dog.css";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { DisplayContext } from "../../Context/DisplayContext";

const Dog = () => {
  const { dogData } = useContext(DisplayContext);
  const { dogId } = useParams();
  const dog = dogData.find((dog) => dog.id === dogId);

  return (
    dog && (
      <div className="dog-page">
        <div className="dog-img-container">
          <img src={dog.img} />
        </div>
        <div className="dog-details">
          <h2>{dog.name}</h2>
          <p>{dog.age} year(s) old</p>
          <p>{dog.breed}</p>
        </div>
      </div>
    )
  );
};

export default Dog;
