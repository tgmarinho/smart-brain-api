const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())

const database = {
  users: [
    {
      id: '123',
      name: 'Jhon',
      email: 'jhon@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'sally',
      email: 'sally@gmail.com',
      password: 'bananas',
      entries: 0,
      joined: new Date()
    }
  ]
}

app.get('/', (req, res) => {
  res.send(database.users);
})

app.post('/signin', (req, res) => {
 console.log(req)
  console.log(req.body.email);
 console.log(req.body.password);


  if (req.body.email === database.users[0].email
    && req.body.password === database.users[0].password) {
    res.json('sucess')

  } else {
    res.status(400).json('error loggin in')
  }

})


app.post('/register', (req, res) => {
  console.log(req.body.email);
 console.log(req.body.password);
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
})

app.listen(3000, () => {
  console.log('App is runing on port 3000!!!')
});


/*

/ --> response = this is working
/signin --> POST = sucess/fail
/register --> POST = user
/profile/:userId  --> GET = user
/image --> PUT --> user

*/