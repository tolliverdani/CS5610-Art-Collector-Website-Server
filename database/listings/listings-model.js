import mongoose from "mongoose";
import listingsSchema from "./listings-schema.js";

const listingsModel = mongoose.model("ListingsModel", listingsSchema);

export default listingsModel