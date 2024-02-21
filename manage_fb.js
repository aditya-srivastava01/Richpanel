let meta_data  = []
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  if (response.status === 'connected') {
    testAPI();
  } else {
    document.getElementById('status').innerHTML = 'Please log into this webpage.';
  }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '748002430612215', // Replace with your Facebook App ID
    xfbml      : true,
    version    : 'v19.0' // Update to the desired Graph API version
  });

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};

function testAPI() {
  console.log('Welcome! Fetching your information....');
  FB.api('/me/accounts', function(response) { // 'accounts' endpoint fetches the list of pages
    console.log('Successful login for: ' + response.name);
    document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.name + '!';
    meta_data = response;
    console.log('Page list:', response.data); // Output the list of pages
  });
}
window.fbAsyncInit = function() {
  FB.init({
    appId      : '748002430612215', // Replace with your Facebook App ID
    xfbml      : true,
    version    : 'v19.0' // Update to the desired Graph API version
  });

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  if (response.status === 'connected') {
    testAPI();
  } else {
    document.getElementById('status').innerHTML = 'Please log into this webpage.';
  }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '748002430612215', // Replace with your Facebook App ID
    xfbml      : true,
    version    : 'v19.0' // Update to the desired Graph API version
  });

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};

function test_msg_API() {
  console.log('Welcome! Fetching your information....');
  FB.api('/me/accounts', function(response) {
    console.log('Successful login for: ' + response.name);
    document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.name + '!';

    // Use the Page ID and access token for the page where you want to send the message
    const pageId = 'your-page-id'; // Replace with your Page ID
    const accessToken = 'your-page-access-token'; // Replace with your Page Access Token

    // Send a basic text message
    // sendTextMessage(pageId, accessToken, response.data[0].id, 'Hello, world!');
  });
}

function sendTextMessage(pageId, accessToken, recipientId, messageText) {
  FB.api(
    `/${pageId}/messages`,
    'POST',
    {
      recipient: {
        id: recipientId
      },
      message: {
        text: messageText
      },
      messaging_type: 'RESPONSE', // Use RESPONSE for messages in response to user actions
      access_token: accessToken
    },
    function(response) {
      console.log('Message sent:', response);
    }
  );
}
