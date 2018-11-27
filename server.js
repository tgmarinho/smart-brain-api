const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'tgmarinho',
    password: '',
    database: 'smart-brain'
  }
});

db.select('*').from('users').then(data => {
  console.log(data);
});

const app = express();

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send(database.users);
})

app.post('/signin', (req, res) => {
  // bcrypt.compare("apples", null, null, function(err, hash) {
  //   console.log(hash)
  //  });
  if (req.body.email === database.users[0].email
    && req.body.password === database.users[0].password) {
    res.json(database.users[0]);

  } else {
    res.status(400).json('error loggin in')
  }

})


app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  db('users')
    .returning('*')
    .insert({
      email, name, joined: new Date()
    }).then(user => {
      res.json(user[0])
    }).catch(err => res.status(400).json('unable to register'))
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  db.select('*').from('users').where({ id }).then(user => {
    if (user.length) {
      res.json(user[0])
    } else {
      res.status(404).json('no such user');
    }
  }).catch(err => res.status(400).json('Error getting user'))
});

app.put('/image', (req, res) => {
  const { id } = req.body;

  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json((entries[0]));
  })
  .catch(err => res.status(400).json('unable to get entries'));

    // res.status(404).json('no such user');
});

app.listen(3000, () => {
  console.log('App is runing on port 3000!!!')
});




// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//   // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//   // res = false
// });


/*

/ --> response = this is working
/signin --> POST = sucess/fail
/register --> POST = user
/profile/:userId  --> GET = user
/image --> PUT --> user

*/