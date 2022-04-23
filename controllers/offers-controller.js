import offersDao from "../database/offers/offers-dao.js";

const offersController = (app) => {
    app.get('/api/offers', findAllOffers);
    app.post('/api/offers', createOffer);
    app.get('/api/offers/byPaintingId/:painting_id', findOffersByPaintingId);
    app.get('/api/offers/byBidderId/:owner_id', findOffersByBidderId);
    app.get('/api/offers/bySellerId/:user_id', findOffersBySellerId);
    app.get('/api/offers/byArtistId/:artist_id', findOffersByArtistId);
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

const findOffersByPaintingId = async (req, res) => {
    const painting_id = req.params.painting_id;
    const offers = await offersDao.findOffersByPaintingId(painting_id)
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

const findOffersByArtistId = async (req, res) => {
    const artist_id = req.params.artist_id;
    const offers = await offersDao.findOffersByArtistId(artist_id)
    res.json(offers);
}

export default offersController;
