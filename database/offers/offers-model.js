import mongoose from "mongoose";
import offersSchema from "./offers-schema.js";

const offersModel = mongoose.model("OffersModel", offersSchema);

export default offersModel