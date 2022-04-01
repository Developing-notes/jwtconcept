const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
//This returns the token it self
app.post('/api/login', (req, res) => {
    //here is the mock user
    const user = {
        id: 1,
        username: 'neo',
        id: '23'
    }
    // here we send the jason web token with the user and secret key which in this case is our secret its called WakeUpNeo
    jwt.sign({ user }, 'WakeUpNeo', { expiresIn: '1hour' }, (err, token) => {
        res.json({
            token
        });
    });
});

// here we split the header using a space, then we place on the array, 
function verifyToken(req, res, next) {

    const bearerHeader = req.headers['authorization'];
    //if the header is not undefine we split the bearer
    if (typeof bearerHeader !== 'undefined') {

        const bearer = bearerHeader.split(' ');

        const bearerToken = bearer[1];

        req.token = bearerToken;

        next();

    } else {
        // is undefine cause we do not have the token on our header
        res.sendStatus(403);
    }

}
//we made a post using postman for this exercise, then we consult the verifyToken method to validate
//that the request that has been made is from the user we previousely verified when we login
app.post('/api/post', verifyToken, (req, res) => {
    jwt.verify(req.token, 'WakeUpNeo', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'post created',
                authData
            });
        }
    });
});
// server running on port 5000 
app.listen(5000, () => console.log('server listen on port 5000'));

