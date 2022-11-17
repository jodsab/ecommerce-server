const getPayment = async () => {
  var charge = await tStripe.charges.retrieve("ch_3M3mq32eZvKYlo2C03MEUobN", {
    apiKey: "sk_test_4eC39HqLyjWDarjtT1zdp7dc",
  });
  console.log("charge", charge);

  return charge;
};

export default getPayment;
