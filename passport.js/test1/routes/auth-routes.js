const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
    res.render('login');
});

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    res.send('logging out');
});

// auth with google
router.get('/google', passport.authenticate('google', {
    // scope = what do we want to retrieve from user's profile?
    scope: ['profile']
}));

// callback route for google to redirect to
// -> this time, passport.authenticate('google') uses code in url, and
// -> exchanges it for profile information. Before coming back
// -> to this route, fires passport callback (in passport-setup.js)
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // google redirect comes back with a 'code' that passport can use
    // ex: http://localhost:3000/auth/google/redirect?code=4/OKBj1P_t-TGNYlvheim-L89Bt0UA8PUh_G09jtUDolc#
    res.send('you reached the google callback uri')
});

module.exports = router;