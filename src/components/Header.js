import logo from "../assets/img/logo-vinted.svg";
import { Link } from "react-router-dom";

const Header = ({ userToken, setUser }) => {
  return userToken ? (
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
          // onChange={setSearchBar(event.target.value)}
        />
        <button onClick={() => setUser(null)}>Se déconnecter</button>
        <Link to={`/publish`}>
          <button class="button-vendre">Vends tes articles</button>
        </Link>
      </div>
    </section>
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
          // onChange={setSearchBar(event.target.value)}
        />
        <Link to={`/signup`}>
          <button class="button-inscription">S'inscrire</button>
        </Link>
        <Link to={`/login`}>
          <button class="button-connexion">Se connecter</button>
        </Link>
        <Link to={`/publish`}>
          <button class="button-vendre">Vends tes articles</button>
        </Link>
      </div>
    </section>
  );
};

export default Header;
