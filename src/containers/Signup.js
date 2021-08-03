import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Signup = ({ setUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [valid, setValid] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState("");

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
    event.preventDefault();

    try {
      const newUser = { username: name, email: email, password: password };
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        newUser
      );
      console.log(response.data);
      console.log("Token ===> " + response.data);

      if (response.data.token) {
        setUser(response.data.token);
        history.push("/");
      }
      // Checking if the passwords are correct
      else if (password !== confirmPassword) {
        setErrorPassword(true);
        setErrorMessage("Vos mots de passe ne sont pas identiques.");
      } else {
        setValid(true);
        setErrorPassword(false);
      }

      setData(response.data);
    } catch (error) {
      console.log(error.response);
      console.log(error.message);
      if (error.response.status === 409) {
        setErrorMessage("Cet email est déjà utilisé.");
      }
    }
  };

  return (
    <div class="Signup-container">
      <h2>S'inscrire</h2>
      <form onSubmit={handleSubmit} class="Signup-form">
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
          className={errorPassword && "red-border"}
          placeholder="Mot de passe"
          type="password"
          name="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <input
          className={errorPassword && "red-border"}
          placeholder="Confirmer votre mot de passe"
          value={confirmPassword}
          type="password"
          name="confirm password"
          onChange={(event) => {
            setConfirmPassword(event.target.value);
          }}
        />

        <div class="Checkbox-container">
          <input type="checkbox"></input>
          <span>S'inscrire à notre newsletter</span>
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes et
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
        </div>

        <p>{errorMessage}</p>

        <button class="Signup-button-inscription" type="submit">
          S'inscrire
        </button>
      </form>

      <Link to={`/login`}>
        <p class="Already">Tu as déjà un compte ? Connecte-toi !</p>
      </Link>
    </div>
  );
};

export default Signup;
