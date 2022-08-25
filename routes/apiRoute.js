const express = require('express');
const router = express.Router();
const instagram_artist = require('../controllers/instagramArtistController');


router.get('/', function(req, res, next) { 
    res.send('Welcome to the API');
});

router.get('/artist', instagram_artist.artist_detail);


module.exports = router;