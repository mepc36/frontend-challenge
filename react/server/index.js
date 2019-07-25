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

app.get(`/locations/1/member-checkins`, (request, response) => {
  axios.get(`https://code-challenge-api.club-os.com/api/locations/1/member-checkins`)
  .then(apiResponse => {
    response.status(200).json(apiResponse.data.data)
  })
  .catch(function (error) {
    console.log(error);
    response.status(500).json(error);
  })
})

app.get(`/locations/1/member-agreements`, (request, response) => {
  axios.get(`https://code-challenge-api.club-os.com/api/locations/1/member-agreements`)
  .then(apiResponse => {
    response.status(200).json(apiResponse.data.data)
  })
  .catch(function (error) {
    console.log(error);
    response.status(500).json(error);
  })
})