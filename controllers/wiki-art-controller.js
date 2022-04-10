import axios from 'axios';

const API_BASE = "https://www.wikiart.org/en/api/2"
const API_SHORT = "http://www.wikiart.org/en"
const PAINTING_DETAIL_EXT = '/Painting'
const PAINTINGS_BY_ARTIST_EXT = "/PaintingsByArtist"
const PAINTING_SEARCH_EXT = '/PaintingSearch'
const AUTH_INFO = {
    "accessCode": "7d3507d9d54541eb",
    "secretCode": "8819363e2b62b70c"
}
const IMAGE_SIZE = 'PinterestSmall'

const paintingsController = (app) => {
    app.get('/api/paintings/byArtist/:artist_id', findPaintingsByArtist);
    app.get('/api/paintings/generalSearch/:search_term', paintingGeneralSearch);
    app.get('/api/paintings/artistSearch/:search_term', artistGeneralSearch);
    app.get('/api/paintings/paintingDetails/:painting_id', paintingDetails);
    app.get('/api/artist/:search_term', artistDetails);
    app.get('/api/paintings/random', randomPaintings);
    app.get('/api/artists/updated', updatedArtists);
}

const findPaintingsByArtist = async (req, res) => {
    const artist_id = req.params["artist_id"];
    const request_url = `${API_BASE}${PAINTINGS_BY_ARTIST_EXT}/?id=${artist_id}&imageFormat=${IMAGE_SIZE}`;
    const response = await axios.get(request_url, {headers: AUTH_INFO});
    if (response.status === 200) {
        res.send(response.data);
    } else {
        res.sendStatus(400);
    }
}

const paintingDetails = async (req, res) => {
    console.log("inside paintingDetails");
    const painting_id = req.params["painting_id"];
    const request_url = `${API_BASE}${PAINTING_DETAIL_EXT}/?id=${painting_id}`;
    const response = await axios.get(request_url, {headers: AUTH_INFO});
    if (response.status === 200) {
        res.send(response.data);
    } else {
        res.sendStatus(400);
    }
}

const findPaintingDetails = async (req, res) => {
    const painting_id = req.params["painting_id"];
    const request_url = `${API_BASE}${PAINTING_DETAIL_EXT}/?id=${painting_id}`;
    const response = await axios.get(request_url, {headers: AUTH_INFO});
    if (response.status === 200) {
        res.send(response.data);
    } else {
        res.sendStatus(400);
    }
}

const paintingGeneralSearch = async (req, res) => {
    const search_term = req.params['search_term'];
    const request_url = `${API_BASE}${PAINTING_SEARCH_EXT}/?term=${search_term}`;
    const response = await axios.get(request_url, {headers: AUTH_INFO});
    if (response.status === 200) {
        res.json(response.data.data);
    } else {
        res.sendStatus(400);
    }
}

const artistDetails = async (req, res) => {
    const search_term = req.params['search_term'];
    const request_url = `${API_SHORT}/${search_term}?json=2`;
    const response = await axios.get(request_url, {headers: AUTH_INFO})
    if (response.status === 200) {
        res.send(response.data.data);
    } else {
        res.sendStatus(400);
    }
}

const artistGeneralSearch = async (req, res) => {
    const search_term = req.params['search_term'];
    const request_url = `${API_BASE}${PAINTING_SEARCH_EXT}/?term=${search_term}`;
    const response = await axios.get(request_url, {headers: AUTH_INFO});

    if (response.status === 200) {
        const raw_data = response.data.data;
        let unique_artists = [];

        // start iterating through result set
        for (let i = 0; i < raw_data.length; i++) {
            // if this is the first artist, push it to the list
            if (unique_artists.length === 0) {
                unique_artists.push({"artistId": raw_data[i]["artistId"], "artistName": raw_data[i]["artistName"]});

                // if it is not the first unique artist, look for it in the list to see if needs to be added
            } else {
                let found = false;
                for (let j = 0; j < unique_artists.length; j++) {
                    if (raw_data[i]["artistId"] === unique_artists[j]["artistId"]) found = !found;
                }
                // if the artist isn't found, add it to the list
                if (!found) unique_artists.push({
                    "artistId": raw_data[i]["artistId"],
                    "artistName": raw_data[i]["artistName"]
                });
            }
        }
        res.send(unique_artists);
    } else {
        res.sendStatus(400);
    }
}

const randomPaintings = async (req, res) => {
    const request_url = `${API_BASE}/MostViewedPaintings?imageFormat=${IMAGE_SIZE}`;
    const response = await axios.get(request_url, {headers: AUTH_INFO});
    if (response.status === 200) {
        res.send(response.data.data);
    } else {
        res.sendStatus(400);
    }
}

const updatedArtists = async (req, res) => {
    const request_url = `${API_BASE}/UpdatedArtists`;
    const response = await axios.get(request_url, {headers: AUTH_INFO});
    if (response.status === 200) {
        res.send(response.data.data);
    } else {
        res.sendStatus(400);
    }
}

export default paintingsController;