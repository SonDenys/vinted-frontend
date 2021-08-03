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

// import font from "./assets/fonts";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const stripePromise = loadStripe("pk_test_5z9rSB8XwuAOihoBixCMfL6X");
  const [value, setValue] = useState(0);
  const [basket, setBasket] = useState([]);
  const [total, setTotal] = useState(0);

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

  return (
    <Router>
      <Header userToken={userToken} setUser={setUser} />
      <Switch>
        <Route exact path="/">
          <Home />
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
          <Elements stripe={stripePromise}>
            <Payment userToken={userToken} total={total} basket={basket} />
          </Elements>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
