import offersDao from "../database/offers/offers-dao.js";
import listingsDao from "../database/listings/listings-dao.js";

const offersController = (app) => {
    app.get('/api/offers', findAllOffers);
    app.post('/api/offers', createOffer);
    app.get('/api/offers/byPaintingId/:painting_id', findOffersByPaintingId);
    app.get('/api/offers/byBidderId/:owner_id', findOffersByBidderId);
    app.get('/api/offers/bySellerId/:user_id', findOffersBySellerId);
    app.get('/api/offers/byArtistId/:artist_id', findOffersByArtistId);
    app.get('/api/offers/byListingId/:listing_id', findOffersByListingId);
    app.get('/api/offers/:offer_id', findOfferById)
    app.put('/api/offers/approve', approveOffer);
    app.put('/api/offers/reject/:offer_id', rejectOffer);
}


const findAllOffers = async (req, res) => {
    const offers = await offersDao.findAllOffers();
    res.json(offers);
}

const createOffer = async (req, res) => {
    const offer = req.body;
    const offer_to_insert = {...offer, date_created: new Date()}
    const inserted_offer = await offersDao.createOffer(offer_to_insert);
    res.json(inserted_offer);
}

const findOfferById = async (req, res) => {
    const offer_id = req.params.offer_id;
    const offers = await offersDao.findOffersById(offer_id)
    res.json(offers);
}

const findOffersByPaintingId = async (req, res) => {
    const painting_id = req.params.painting_id;
    const offers = await offersDao.findOffersByPaintingId(painting_id)
    res.json(offers);
}

const findOffersByListingId = async (req, res) => {
    const listing_id = req.params.listing_id;
    const offers = await offersDao.findOffersByListingId(listing_id)
    res.json(offers);
}

const findOffersByArtistId = async (req, res) => {
    const artist_id = req.params.painting_id;
    const offers = await offersDao.findOffersByArtistId(artist_id)
    res.json(offers);
}

const findOffersByBidderId = async (req, res) => {
    const user_id = req.params.owner_id;
    const offers = await offersDao.findOffersByBidderId(user_id)
    res.json(offers);
}

const findOffersBySellerId = async (req, res) => {
    const user_id = req.params.user_id;
    const offers = await offersDao.findOffersBySellerId(user_id)
    res.json(offers);
}

// const rejectOffer = async (req, res, {offer}) => {
//     const offer_id = offer._id;
//     const offer_to_update = {...offer, active_offer: false, accepted:false, date_removed: new Date()}
//     const update_status = await offersDao.updateOffer(offer_id, offer_to_update);
//     if ( update_status.modifiedCount === 1 ){
//         res.sendStatus(200);
//     } else {
//         res. sendStatus(400);
//     }
// }

{/* TODO: this needs help */}
const approveOffer = async (req, res) => {
    const offer = req.body;
    const offer_id = req.body._id;
    const listing_id = req.body.listing_id;
    const accepted_offer = {...offer, active_offer: false, accepted: true, date_removed: new Date()}
    const update_status = await offersDao.updateOffer(offer_id, accepted_offer)
    if ( update_status.modifiedCount === 1) {
        offersDao.findOffersByListingId(listing_id).then( (offers) => {
            for ( let i = 0; i < offers.length; i++ ) {
                if (offers[i]._id.toString() !== offer_id.toString()) {
                    offers[i].active_offer = false
                    offers[i].accepted = false
                    offers[i].date_removed = new Date()
                    offersDao.updateOffer(offers[i]._id, offers[i]).then((update_status) => {
                    })
                }
            }
        })
        console.log(listing_id)
        console.log(typeof(listing_id))
        listingsDao.findListingsById(listing_id).then(listing => {
            console.log("Here is the listing: " + JSON.stringify(listing, undefined, 4))
            listing.active_listing = false;
            listing.sold = true;
            listing.sale_price = accepted_offer.offer_price;
            listing.buyer_id = accepted_offer.buyer_id;
            listing.date_removed = new Date();
            console.log("Here is the listing after being altered: " + JSON.stringify(listing, undefined, 4))

            listingsDao.updateListing(listing_id,listing).then(response => {
                console.log(response)
                console.log(listing_id)
                res.send({"listingId": listing_id})
            })
        })
    } else {
        res.sendStatus(400);
    }
}

{/* TODO: this needs help */}
const rejectOffer = async (req, res) => {
    const user_id = req.params.user_id;
    const offer_id = req.params.offer_id;
    const offers = await offersDao.rejectOffer(user_id, user_id)
    res.json(offers);
}

export default offersController;
