import { useLocation } from "react-router";
import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

// import axios from "axios";

const Payment = (userToken) => {
  const location = useLocation();
  //   console.log(location.state.data);

  const stripe = useStripe();
  const elements = useElements;

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // we get here the databanqs of the users
    const cardElement = elements.getElements(cardElement);

    // Token creation via the API Strike
    // We send the databanqs in the request
    const stripeResponse = await stripe.createToken(cardElement, {
      name: userToken,
    });
    console.log(stripeResponse);
    const stripeToken = stripeResponse.token.id;
    // Once the token received from the API Stripe
    // Request to our server
    // We send the token received from the API Srip
    const response = await axios.post(
      "https://lereacteur-vinted-api.herokuapp.com/payment",
      {
        stripeToken,
      }
    );
    console.log(response.data);
    // Si la réponse du serveur est favorable, la transaction a eu lieu
    if (response.data.status === "succeeded") {
      setCompleted(true);
    }
  };

  return (
    <div class="Payment-card-summary">
      <h2 class="title">Résumé de la commande</h2>
      <div className="command-resume">
        {!completed ? (
          <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit">Valider le paiement</button>
          </form>
        ) : (
          <span>Paiement effectué ! </span>
        )}
      </div>
    </div>
  );
};

export default Payment;
