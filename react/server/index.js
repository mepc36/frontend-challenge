const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const axios = require('axios');
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

app.get('/locations/:id/member-checkins', (request, response) => {
  const idTwo = request.params.id;
  axios.get(`https://code-challenge-api.club-os.com/api/locations/${idTwo}/member-checkins`)
  .then(apiResponse => {
    response.status(200).json(apiResponse.data.data)
  })
  .catch(function (error) {
    console.log(error);
    response.status(500).json(error);
  })
})

app.get('/locations/:id/member-agreements', (request, response) => {
  const idThree = request.params.id;
  axios.get(`https://code-challenge-api.club-os.com/api/locations/${idThree}/member-agreements`)
  .then(apiResponse => {
    response.status(200).json(apiResponse.data.data)
  })
  .catch(function (error) {
    console.log(error);
    response.status(500).json(error);
  })
})