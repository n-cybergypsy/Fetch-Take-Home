import { React, useState, useEffect, useContext } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/authProvider";
import { createUser, getFavorites, getUserId, getUsers, loginUser } from "../../api";
import { UserContext } from "../../Context/UserContext";
import Bone from "../../Components/Assets/bone.png"

const Login = () => {
  const {setCurrUser, currUser, favoriteDogs, setFavoriteDogs} = useContext(UserContext);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const fetchURL = "https://frontend-take-home-service.fetch.com";
  const handleUser = async (data) => {
    const user_name = data.get("name")
    const user_email = data.get("email")
    const allUsers = await getUsers();
    if (!allUsers.some(e => e.email_address === user_email)){
      createUser(user_name, user_email)
    }
    const userId = (await getUserId(user_email)).user_id
    setCurrUser(userId)
    // setFavoriteDogs((await getFavorites(userId)).map((e)=>e.dog_id))
  }

  useEffect(() => {
    const formElement = document.querySelector(".login-form");

    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(formElement);
      loginUser(formData)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        handleUser(formData)
        setTimeout(() => {
          //Give some time for authentication to complete
          navigate("/", {replace: true});
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
      });
    });
  }, []);

  return (
    <div className="login-page">
      <h1>SHELTERED DOG DATABASE</h1>
      <form className="login-form">
        <input name="name" type="text" placeholder="Name" />
        <input name="email" type="email" placeholder="Email address" />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
