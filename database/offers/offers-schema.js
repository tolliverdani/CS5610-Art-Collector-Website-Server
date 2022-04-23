import mongoose from "mongoose";

const offersSchema = mongoose.Schema({
    listing_id: {type: String, required: true},
    painting_id: {type: String, required: true},
    painting_name: {type: String, required: true},
    artist_id: {type: String, required: true},
    artist_name: {type: String, required: true},
    seller_id: {type: String, required: true},
    buyer_id: {type: String, required: true},
    buyer_name: {type: String, required: true},
    offer_price: {type: Number, require: true},
    date_created: {type: Date, required: true},
    active_offer: {type: Boolean, required: true},
    accepted: Boolean,
    date_removed: Date
}, {collection: "offers"})

export default offersSchema;