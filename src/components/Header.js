import logo from "../assets/img/logo-vinted.svg";
import { Link } from "react-router-dom";

const Header = ({ userToken, setUser }) => {
  return userToken ? (
    <button onClick={() => setUser(null)}>Se déconnecter</button>
  ) : (
    <section id="Header">
      <div>
        <Link to={`/`}>
          <img src={logo} alt="logo-vinted" className="logo"></img>
        </Link>
      </div>
      <div>
        <input
          className="search"
          type="text"
          placeholder="Rechercher des articles"
          id="searchBar"
        />
        <Link to={`/signup`}>
          <button class="button-inscription">S'inscrire</button>
        </Link>
        <Link to={`/login`}>
          <button class="button-connexion">Se connecter</button>
        </Link>
        <button class="button-vendre">Vends tes articles</button>
      </div>
    </section>
  );
};

export default Header;
