import mongoose from "mongoose";

// https://mongoosejs.com/docs/schematypes.html

const transactionSchema = mongoose.Schema({
    // transaction_id created by database
    user_id: String,
    type: {type: String, enum: ['sell, buy, barter']},
    offer: Number,
    quality: {String, enum: ['poor, fair, good, excellent']},
    rating: {type: Number, default: null}
}, {collection: "transactions"})

export default transactionSchema