const express =  require('express');
const router = express.Router();
const User = require('../controllers/user');

const UserCtr = require('../controllers/user')


router.get('/secret', UserCtr.authMiddleware, function(req,res) {
    
    res.json({"token authorized":true});

})

router.post('/auth', User.auth);

router.post('/register', User.register)

module.exports = router;