import "./styles.css";
import Login from "./Pages/Login/Login";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Favorites from "./Pages/Favorites/Favorites";
import Dog from "./Pages/Dog/Dog";
import DisplayContextProvider from "./Context/DisplayContext";

import NavBar from "./Components/NavBar/NavBar";
import { useContext } from "react";
import { UserContext } from "./Context/UserContext";

// import Routes from "./routes/routes";

export default function App() {
  const PrivateRoute = () => {
    const { currUser } = useContext(UserContext);
    return currUser ? <Outlet /> : <Navigate to="/login" />;
  };
  return (
    <div className="App">
      <DisplayContextProvider>
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<PrivateRoute />}>
                <Route path="/" element={<Home />} />
              </Route>
              <Route path="/favorites" element={<PrivateRoute />}>
                <Route path="/favorites" element={<Favorites />} />
              </Route>
              <Route path="/dog" element={<PrivateRoute />}>
                <Route path="/dog" element={<Dog />}>
                  <Route path=":dogId" element={<Dog />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
      </DisplayContextProvider>
    </div>
  );
}
