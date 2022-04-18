import mongoose from "mongoose";

// https://mongoosejs.com/docs/schematypes.html

const transactionSchema = mongoose.Schema({
    // transaction_id created by database
    user_id: String,
    type: {type: String, enum: ['seller, buyer, barter']},
    value: Number,
    quality: {String, enum: ['poor, fair, good, excellent']},
    ratings:
        {
            user_id: String,
            rating: {type: Number, required: true}
        } // for after the transaction
}, {collection: "transactions"})

export default transactionSchema