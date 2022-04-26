import offersModel from "./offers-model.js";

const findAllOffers = () => offersModel.find().sort({painting_name: 1});
const findOffersById = (offer_id) => offersModel.findById(offer_id);
const findOffersByPaintingId = (value) => offersModel.find({painting_id: value}).sort({date_created:-1});
const findOffersByArtistId = (value) => offersModel.find({artist_id: value});
const findOffersByListingId = (value) => offersModel.find({listing_id: value});
const findOffersByBidderId = (value) => offersModel.find({bidder_id: value});
const findOffersBySellerId = (value) => offersModel.find({seller_id: value});

const createOffer = (offer) => offersModel.create(offer);
const rejectOffer = (offer_id) => offersModel.deleteOne({_id: offer_id});
const approveOffer = (offer_id) => offersModel.deleteOne({_id: offer_id});
const deleteOffer = (offer_id) => offersModel.deleteOne({_id: offer_id});
const updateOffer = (offer_id, offer) => offersModel.updateOne({_id: offer_id},{$set: offer})

export default {
    findAllOffers,
    findOffersById,
    findOffersByPaintingId,
    findOffersByListingId,
    findOffersByArtistId,
    findOffersBySellerId,
    findOffersByBidderId,
    createOffer,
    rejectOffer,
    approveOffer,
    deleteOffer,
    updateOffer
}
