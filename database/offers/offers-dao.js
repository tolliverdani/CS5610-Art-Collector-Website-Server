import offersModel from "./offers-model.js";

const findAllOffers = () => offersModel.find();
const findOffersById = (offer_id) => offersModel.findById(offer_id);
const findOffersByPaintingId = (value) => offersModel.find({painting_id: value});
const findOffersByArtistId = (value) => offersModel.find({artist_id: value});
const findOffersByBidderId = (value) => offersModel.find({bidder_id: value});
const findOffersBySellerId = (value) => offersModel.find({seller_id: value});

const createOffer = (offer) => offersModel.create(offer);
const deleteOffer = (offer_id) => offersModel.deleteOne({_id: offer_id});
const updateOffer = (offer_id, offer) => offersModel.updateOne({_id: offer_id},{$set: offer})

export default {
    findAllOffers,
    findOffersById,
    findOffersByPaintingId,
    findOffersByArtistId,
    findOffersBySellerId,
    findOffersByBidderId,
    createOffer,
    deleteOffer,
    updateOffer
}
