const Clarifai = require('clarifai');


//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
  apiKey: '42d24a8ac337483fa6aa3483de101c19'
});


const handleApiCall = () => (req, res) => {
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
      .then(data => {
          res.json(data);
      })
      .catch(err => res.status(400).json('unable to work with API'))
};

const handleImage = (db) => (req, res) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json((entries[0]));
    })
    .catch(err => res.status(400).json('unable to get entries'));
}

module.exports = {
  handleImage,
  handleApiCall
}