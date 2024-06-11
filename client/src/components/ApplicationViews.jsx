import { Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";

 

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
        <Route>
            <Route
            path="login"
            element={<Login setLoggedInUser={setLoggedInUser} />}
            />
            <Route
            path="register"
            element={<Register setLoggedInUser={setLoggedInUser} />}
            />
        </Route>
        <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
