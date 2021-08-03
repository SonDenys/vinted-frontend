import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const Offer = (userToken) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>En cours de chargement...</p>
  ) : (
    <div class="Offer-body">
      <div class="Offer-container">
        <div class="Offer-pictures">
          <img
            src={data.product_image.secure_url}
            alt={data.product_name}
          ></img>
        </div>
        <div class="Offer-infos">
          <div>
            <span class="Offer-price">{data.product_price} €</span>
            <ul class="Offer-list">
              {data.product_details.map((elem, index) => {
                const keys = Object.keys(elem);
                // 1er tour : ["MARQUE"]
                // 2e tour : ["TAILLE"]
                return (
                  <li>
                    <div class="Infos-list">
                      <span>{keys[0]}</span>
                      <span>{elem[keys[0]]}</span>

                      {/* 1er tour : elem.MARQUE
                       2e tour : elem.TAILLE
                      */}
                    </div>
                  </li>
                );
              })}
            </ul>
            <div class="divider"></div>
            <div class="Offer-content">
              <p class="Offer-name">{data.product_name}</p>
              <p class="Offer-description">{data.product_description}</p>
              <p class="Offer-avatar-username">{data.owner.account.username}</p>
            </div>

            <button onClick={() => history.push("/payment")}>
              Achetez maintenant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Offer;
