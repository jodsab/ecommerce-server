import Stripe from "stripe";

const tStripe = Stripe(
  "sk_test_51M4GKYCk72AECnlXJ7ZGiozsZ6SFdZyyBRJi7bUIXtgIUKuqbDWL5C7JQiWCwNo3489et4vqrFO8s4jbhI6ALZuP00K0FvH0w4"
);

const getPayment = async () => {
  var charge = await tStripe.charges.retrieve("ch_3M3mq32eZvKYlo2C03MEUobN", {
    apiKey: "sk_test_4eC39HqLyjWDarjtT1zdp7dc",
  });
  console.log("charge", charge);

  return charge;
};

export default getPayment;
