const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');

const app = express();

app.use(bodyParser.json())

const database = {
  users: [
    {
      id: '123',
      name: 'Jhon',
      email: 'jhon@gmail.com',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'sally',
      email: 'sally@gmail.com',
      entries: 0,
      joined: new Date()
    }
  ],
  login: [
    {
      id: '987',
      hash: '',
      email: 'jhon@gmail.com'
    }
  ]
}

app.get('/', (req, res) => {
  res.send(database.users);
})

app.post('/signin', (req, res) => {

  bcrypt.compare("apples", null, null, function(err, hash) {
    console.log(hash)
   });
  if (req.body.email === database.users[0].email
    && req.body.password === database.users[0].password) {
    res.json('sucess')

  } else {
    res.status(400).json('error loggin in')
  }

})


app.post('/register', (req, res) => {

  const { email, name, password } = req.body;

      database.users.push({
      id: '125',
      name,
      email,
      password,
      entries: 0,
      joined: new Date()
    })
res.json(database.users[database.users.length - 1])
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if(user.id === id) {
      found = true;
      return res.json(user)
    }
  })
  if(!found) {
      res.status(404).json('no such user');
  }
});

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if(user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries)
    }
  })
  if(!found) {
      res.status(404).json('no such user');
  }
})

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