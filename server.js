const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false })); // required for signed_request
app.use(bodyParser.json());
app.use(express.static('public'));

// Canvas signed request route
app.post('/', (req, res) => {
  const signedRequest = req.body.signed_request;

  if (!signedRequest) {
    console.error('No signed_request received!');
    return res.status(400).send('Missing signed_request');
  }

  // Optional: decode it if needed
  const [sig, payload] = signedRequest.split('.');
  const context = JSON.parse(Buffer.from(payload, 'base64').toString('utf8'));

  console.log('Canvas context received:', context);

  // Serve your app
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Canvas App running on http://localhost:${PORT}`);
});