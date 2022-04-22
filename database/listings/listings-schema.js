import mongoose from "mongoose";

const listingsSchema = mongoose.Schema({
    painting_id: {type: String, required: true},
    artist_id: {type: String, required: true},
    owner_id: {type: String, required: true},
    quality: {String, enum: ['poor, fair, good, excellent']},
    listing_price: {type: Number, require: true},
    date_created: {type: Date, required: true},
    active_listing: {type: Boolean, required: true},
    sold: Boolean,
    sale_price: Number,
    buyer_id: String,
    date_removed: Date
}, {collection: "listings"})