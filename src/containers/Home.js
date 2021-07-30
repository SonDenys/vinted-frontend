import { Link } from "react-router-dom";
import banner from "../assets/img/banner-vinted.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers "
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>En cours de chargement...</p>
  ) : (
    <>
      <section id="Banner">
        <img src={banner} alt="Banner-Image"></img>
        <div class="Block-banner">
          <h1>Prêts à faire du tri dans vos placards ?</h1>
          <button>Vends maintenant</button> <p>Découvrir comment ça marche</p>
        </div>
      </section>

      <section id="Home-Card-Offers">
        {data.offers.map((offer, index) => {
          return (
            <>
              <Link to={`/offer/${offer._id}`}>
                <div class="Card-container" key={index}>
                  <div class="Card-username">
                    {offer.owner.account.username}
                  </div>
                  <img
                    src={offer.product_image.secure_url}
                    alt={offer.product_name}
                  />
                  <p class="price">{offer.product_price} €</p>
                  <p class="taille"> {offer.product_details[1].TAILLE}</p>
                  <p class="marque"> {offer.product_details[0].MARQUE}</p>
                </div>
              </Link>
            </>
          );
        })}
      </section>
    </>
  );
};

export default Home;
