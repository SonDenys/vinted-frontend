import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe("pk_test_5z9rSB8XwuAOihoBixCMfL6X");

const Payment = () => {
  const location = useLocation();
  const { product_name, product_price } = location.state.data;

  return (
    <div>
      <p>{product_name}</p>
      <p>{product_price}</p>
      <Elements stripe={stripePromise}>
        <CheckoutForm
          product_price={product_price}
          prodcut_name={product_name}
        />
      </Elements>
    </div>
  );
};

export default Payment;
