import logo from "../assets/img/logo-vinted.svg";
import { Link } from "react-router-dom";

const Header = (userToken, setUser) => {
  return userToken ? (
    <button onClick={() => setUser(null)}>Se déconnecter</button>
  ) : (
    <section id="Header">
      <img src={logo} alt="logo-vinted"></img>
      <input type="text" placeholder="Rechercher des articles" />
      <Link to={`/user/signup`}>
        <button>S'inscrire</button>
      </Link>
      <Link to={`/login`}>
        <button>Se connecter</button>
      </Link>

      <button>Vends tes articles</button>
    </section>
  );
};

export default Header;
