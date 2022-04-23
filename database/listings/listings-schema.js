import mongoose from "mongoose";

const listingsSchema = mongoose.Schema({
    painting_id: {type: String, required: true},
    painting_title: {type: String, required: true},
    painting_image: {type: String, required: true},
    artist_id: {type: String, required: true},
    artist_name: {type: String, required: true},
    owner_id: {type: String, required: true},
    owner_name: {type: String, required: true},
    quality: {type: String, enum: ['poor', 'fair', 'good', 'excellent']},
    listing_price: {type: Number, require: true},
    date_created: {type: Date, required: true},
    active_listing: {type: Boolean, required: true},
    sold: Boolean,
    sale_price: Number,
    buyer_id: String,
    date_removed: Date
}, {collection: "listings"})

export default listingsSchema;