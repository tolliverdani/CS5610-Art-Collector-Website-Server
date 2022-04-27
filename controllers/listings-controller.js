import listingsDao from "../database/listings/listings-dao.js";

const listingsController = (app) => {
    app.get('/api/listings', findAllListings);
    app.post('/api/listings', createListing);
    app.delete('/api/listings/:listing_id', deleteListing);
    app.put('/api/listings/remove', removeListing);
    app.get('/api/listings/byPaintingId/:painting_id', findListingsByPaintingId);
    app.get('/api/listings/sold/byPaintingId/:painting_id', findSoldListingsByPaintingId);
    app.get('/api/listings/byOwnerId/:owner_id', findListingsByOwnerId);
    app.get('/api/listings/byArtistId/:artist_id', findListingsByArtistId);
}

const deleteListing = async (req, res) => {
    const listing_id = req.params.listing_id;
    const status = listingsDao.deleteListing(listing_id);
    if ( status.deletedCount === 1) {
        res.sendStatus(200)
    } else {
        res.sendStatus(400)
    }
}

const removeListing = async (req, res) => {
    const listing = req.body;
    const listing_to_remove = {...listing, active_listing: false, sold: false, date_removed: new Date()}
    const status = await listingsDao.updateListing(listing._id, listing_to_remove)
    if ( status.modifiedCount === 1 ){
        res.sendStatus(200)
    } else {
        res.sendStatus(400)
    }
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
