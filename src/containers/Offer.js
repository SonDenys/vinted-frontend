import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

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
    <div>
      <img src={data.product_image.secure_url} alt={data.product_name}></img>
      <p>{data.product_price} €</p>
      <ul>
        {data.product_details.map((elem, index) => {
          const keys = Object.keys(elem);
          // 1er tour : ["MARQUE"]
          // 2e tour : ["TAILLE"]
          return (
            <li>
              <span>{keys[0]}</span>
              <span>{elem[keys[0]]}</span>
              {/* 1er tour : elem.MARQUE
                  2e tour : elem.TAILLE
               */}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Offer;
