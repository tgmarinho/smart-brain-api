const handleRegister = (req, res,db, bcrypt) => {
  const { email, name, password } = req.body;
  const hash = bcrypt.hashSync(password)
  db.transaction(trx => {
    trx.insert({
      hash,
      email
    })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0],
            name,
            joined: new Date()
          })
          .then(user => {
            res.json(user[0])
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
  })
};

module.exports = {
  handleRegister: handleRegister
};