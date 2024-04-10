const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const { URLSearchParams } = require('url');
const cors = require('cors');

const app = express();
const port = 3000;

const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
const apiLink = 'https://www.zohoapis.com/creator/custom/vanavihari/';
app.post('/registration', async (req, res) => {
  const publickey = '8xZYn5bvUfjjBVVpvK7qAsKsR';
  const apiUri = apiLink+'Account_Registration?publickey='+publickey;
  const updates = req.body.params.updates;
  const queryParams = updates.map(update => `${update.param}=${encodeURIComponent(update.value)}`);
  const queryString = queryParams.join('&');
  const finalUrl = `${apiUri}&${queryString}`;

  try {
    const response = await axios.get(finalUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.response.data);
    res.status(error.response.status).json(error.response.data);
  }
});

app.post('/email-verification', async (req, res) => {
  const publickey = 'fArmqypVSku88tfArkejTR5wq';
  const apiUri = apiLink+'Email_Verification?publickey='+publickey;
  const verificationToken = req.body.verificationToken;
  const finalUrl = apiUri+'&'+'token='+verificationToken;
  try {
    const response = await axios.get(finalUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.response.data);
    res.status(error.response.status).json(error.response.data);
  }
});

app.post('/login', async (req, res) => {
  const publickey = '3gJbpvFUR8pR3knE8u0tMtt8p';
  const apiUri = apiLink+'Login_Validation?publickey='+publickey;
  const updates = req.body.params.updates;
  const queryParams = updates.map(update => `${update.param}=${encodeURIComponent(update.value)}`);
  const queryString = queryParams.join('&');
  const finalUrl = `${apiUri}&${queryString}`;

  try {
    const response = await axios.get(finalUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.response.data);
    res.status(error.response.status).json(error.response.data);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
