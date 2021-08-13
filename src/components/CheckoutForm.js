import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = ({ product_price, product_name }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      //   Récupérer les infos bancaires
      const cardElements = elements.getElement(CardElement);

      // Demande un token à l'API
      // Envoie des données bancaires
      const stripeResponse = await stripe.createToken(cardElements, {
        name: "490294029509502",
      });
      console.log(stripeResponse.token.id); // le token a envoyer au serveur
      // Requête au serveur
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: stripeResponse.token.id,
          amount: product_price,
          title: product_name,
        }
      );
      console.log(response.data);
      if (response.data.status === "succeeded") {
        setCompleted(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return completed ? (
    <p>Merci pour votre paiement !</p>
  ) : (
    <form onSubmit={handleSubmit}>
      {/* Input pour les numéros de CB */}
      <CardElement />
      <input type="submit" />
    </form>
  );
};

export default CheckoutForm;
