const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const { getConnection } = require('./data/connection');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = getConnection();

const app = express();

app.use(bodyParser.json())
app.use(cors())

app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.handleProfileGet(db))
app.put('/image', image.handleImage(db));
app.post('/imageurl', image.handleApiCall());


app.listen(process.env.PORT, () => {
  console.log(`App is running on port ${process.env.PORT}!!!`)
});
