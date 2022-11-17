import Stripe from "stripe";
import config from "../../../config.js";

const tStripe = Stripe(process.env.STRIPE_SK);

export default 