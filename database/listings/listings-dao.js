import listingsModel from "./listings-model.js";

const findAllListings = () => listingsModel.find().sort({painting_title: 1});
const findListingsById = (listing_id) => listingsModel.findById(listing_id);
const findListingsByPaintingId = (value) => listingsModel.find({painting_id: value});
const findSoldListingsByPaintingId = (value) => listingsModel.find({painting_id: value, sold: true}).sort({date_removed: -1})
const findListingsByArtistId = (value) => listingsModel.find({artist_id: value});
const findListingsByOwnerId = (value) => listingsModel.find({owner_id: value});

const createListing = (listing) => listingsModel.create(listing);
const deleteListing = (listing_id) => listingsModel.deleteOne({_id: listing_id});
const updateListing = (listing_id, listing) => listingsModel.updateOne({_id: listing_id},{$set: listing})

export default {
    findAllListings,
    findListingsById,
    findListingsByPaintingId,
    findListingsByArtistId,
    findListingsByOwnerId,
    createListing,
    deleteListing,
    updateListing,
    findSoldListingsByPaintingId
}
