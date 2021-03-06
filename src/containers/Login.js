import { useHistory, Link, Redirect } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = ({ setUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const response = await axios.post(
        `https://lereacteur-vinted-api.herokuapp.com/user/login`,
        { email: email, password: password }
      );

      if (response.data.token) {
        setUser(response.data.token);
        history.push("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div class="Login-container">
      <h2>Se connecter</h2>
      <form onSubmit={handleSubmit} class="Login-form">
        <input
          placeholder="Nom d'utilisateur"
          type="text"
          name="email"
          value={name}
          onChange={handleNameChange}
        />
        <input
          placeholder="Email"
          type="text"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          className={errorPassword}
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <p>{errorMessage}</p>
        <button class="Login-button" type="submit">
          Se connecter
        </button>
        <Link to={"/signup"}>
          <p class="Already">Pas encore de compte ? Inscris-toi !</p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
