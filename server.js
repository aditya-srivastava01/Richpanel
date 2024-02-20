const express = require('express');
const axios = require('axios');
const app = express();

const appId = '941534957504154';
const appSecret = '00cc7dd8001778d67b58ece34a1ecead'; // Keep this secret!

app.get('/connect-facebook/callback', async (req, res) => {
  const { code } = req.query;

  // Exchange code for access token
  const tokenResponse = await axios.get(`https://graph.facebook.com/v13.0/oauth/access_token`, {
    params: {
      client_id: appId,
      client_secret: appSecret,
      redirect_uri: 'http://127.0.0.1:5500/manage_fb.html',
      code,
    },
  });

  const accessToken = tokenResponse.data.access_token;

  // Now you can use accessToken to make requests to the Facebook Graph API

  res.send('Facebook authentication successful!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
