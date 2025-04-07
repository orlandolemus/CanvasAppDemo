const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('This endpoint expects a POST request with a signed_request from Salesforce Canvas.');
});

app.post('/', (req, res) => {
  try {
    const signedRequest = req.body.signed_request;

    if (!signedRequest) {
      return res.status(400).send('Missing signed_request');
    }

    const [sig, payload] = signedRequest.split('.');
    const context = JSON.parse(Buffer.from(payload, 'base64').toString('utf8'));

    console.log('✔️ Canvas context received:', context);

    res.render('index', { context });
  } catch (err) {
    console.error('❌ Error handling signed request:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/', (req, res) => {
  res.send('This endpoint expects a POST request with a signed_request from Salesforce Canvas.');
});

app.listen(PORT, () => {
  console.log(`Canvas App running on http://localhost:${PORT}`);
});
