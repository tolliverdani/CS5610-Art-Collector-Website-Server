import listingsDao from "../database/listings/listings-dao.js";

const listingsController = (app) => {
    app.get('/api/listings', findAllListings);
    app.post('/api/listings', createListing);
    app.get('/api/listings/byPaintingId/:painting_id', findListingsByPaintingId);
    app.get('/api/listings/sold/byPaintingId/:painting_id', findSoldListingsByPaintingId);
    app.get('/api/listings/byOwnerId/:owner_id', findListingsByOwnerId);
    app.get('/api/listings/byArtistId/:artist_id', findListingsByArtistId);


}

const findAllListings = async (req, res) => {
    const listings = await listingsDao.findAllListings();
    res.json(listings);
}

const createListing = async (req, res) => {
    const listing = req.body;
    const listing_to_insert = {...listing, date_created: new Date()}
    const inserted_listing = await listingsDao.createListing(listing_to_insert);
    res.json(inserted_listing);
}

const findListingsByPaintingId = async (req, res) => {
    const painting_id = req.params.painting_id;
    const listings = await listingsDao.findListingsByPaintingId(painting_id)
    res.json(listings);
}

const findSoldListingsByPaintingId = async (req, res) => {
    const painting_id = req.params.painting_id;
    const listings = await listingsDao.findSoldListingsByPaintingId(painting_id)
    res.json(listings);
}

const findListingsByOwnerId = async (req, res) => {
    const owner_id = req.params.owner_id;
    const listings = await listingsDao.findListingsByOwnerId(owner_id)
    res.json(listings);
}

const findListingsByArtistId = async (req, res) => {
    const artist_id = req.params.artist_id;
    const listings = await listingsDao.findListingsByArtistId(artist_id)
    res.json(listings);
}

export default listingsController;
