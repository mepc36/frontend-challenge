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
    // console.log(apiResponse.data.data[0]); // all member's info; individual members are accessed by adding bracketed array indexes
    response.status(200).json(apiResponse.data.data)
  })
  .catch(function (error) {
    console.log(error);
    response.status(500).json(error);
  })
})