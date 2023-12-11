import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import { verify } from "./api/auth";
import Register from "./pages/Register";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Fetch the user email and token from local storage
    const user = localStorage.getItem("user");
    const storedUser = user ? JSON.parse(user) : null;
    // If the token/email does not exist, mark the user as logged out
    if (!storedUser?.token) {
      setLoggedIn(false);
      return;
    }

    verify(storedUser.token).then((r) => {
      setLoggedIn(r.status === 200);
      setEmail(storedUser.email || "");
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                email={email}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            }
          />
          <Route
            path="/login"
            element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />}
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
