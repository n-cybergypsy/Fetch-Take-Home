import { useState, createContext, useEffect } from "react";
import { getFavorites } from "../api";
export const UserContext = createContext(null);

const UserContextProvider = (props) => {
  const [currUser, setCurrUser] = useState(JSON.parse(window.sessionStorage.getItem("currUser")));
  const [favoriteDogs, setFavoriteDogs] = useState(null);

  const contextValue = { currUser, setCurrUser, favoriteDogs, setFavoriteDogs };

  // useEffect(()=> {
  //   console.log("curruser", window.sessionStorage.getItem("currUser"))
  //   if (window.sessionStorage.getItem("currUser")){
  //     setCurrUser(
  //       window.sessionStorage.getItem("currUser"));
  //     }
  // }, [])
  useEffect(()=> {
    window.sessionStorage.setItem("currUser", currUser);
    if (currUser){
      getFavorites(currUser)
          .then((res)=>{return res.json()})
          .then((data)=> {setFavoriteDogs(data.map((e)=>e.dog_id))})
          .catch((error)=>{console.error(error)})
    }
  }, [currUser])

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
