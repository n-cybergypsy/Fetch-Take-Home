import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import UserContextProvider from "./Context/UserContext";
import AuthProvider from "./provider/authProvider";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <AuthProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </AuthProvider>
  </StrictMode>
);
