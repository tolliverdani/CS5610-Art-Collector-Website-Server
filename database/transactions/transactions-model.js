import mongoose from "mongoose";
import transactionsSchema from "./transactions-schema.js";

const transactionsModel = mongoose.model("TransactionsModel", transactionsSchema);

export default transactionsModel;