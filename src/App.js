import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import "./App.css";
import Header from "./components/Header";
import Signup from "./containers/Signup";
import { useState } from "react";
import Cookies from "js-cookie";
import Login from "./containers/Login";
import Publish from "./containers/Publish";

// import font from "./assets/fonts";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [searchBar, setSearchBar] = useState("");

  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, {
        expires: 7,
        sameSite: "none",
        secure: true,
      });
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };

  return (
    <Router>
      <Header userToken={userToken} setUser={setUser} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/login">
          <Login userToken={userToken} setUser={setUser} />
        </Route>
        <Route path="/signup">
          <Signup setUser={setUser} />
        </Route>
        <Route path="/publish">
          <Publish userToken={userToken} setUser={setUser}></Publish>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
