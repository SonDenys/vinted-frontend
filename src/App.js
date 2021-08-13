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
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "./containers/Payment";
import React, { useEffect } from "react";
import axios from "axios";

// import font from "./assets/fonts";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const stripePromise = loadStripe("pk_test_5z9rSB8XwuAOihoBixCMfL6X");
  const [search, setSearch] = useState("");
  const [sortPrice, setSortPrice] = useState(false);
  const [fetchRangeValues, setFetchRangeValues] = useState([0, 10000]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, {
        expires: 3,
        sameSite: "none",
        secure: true,
      });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offers?priceMin=${
          fetchRangeValues[0]
        }&priceMax=${fetchRangeValues[1]}&sort=${
          sortPrice ? "price-desc" : "price-asc"
        }&title=${search}`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [fetchRangeValues, sortPrice, search]);

  return (
    <Router>
      <Header userToken={userToken} setUser={setUser} setSearch={setSearch} />
      <Switch>
        <Route exact path="/">
          <Home data={data} isLoading={isLoading} />
        </Route>
        <Route exact path="/offer/:id">
          <Offer userToken={userToken} />
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
        <Route path="/payment">
          <Payment userToken={userToken} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
