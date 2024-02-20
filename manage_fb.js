// manage_fb.js
document.getElementById('connectButton').addEventListener('click', () => {
    // Replace these values with your Facebook App ID and redirect URI
    const appId = '1094315558546608';
    const redirectUri = 'https://aditya-srivastava01.github.io/Richpanel/';
  
    // Construct the Facebook login URL
    const authUrl = `https://www.facebook.com/v13.0/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=manage_pages`;
  
    // Redirect the user to the Facebook login page
    window.location.href = authUrl;
  });
  
  // Event listener for Disconnect buttons
  document.getElementById('connectedPagesList').addEventListener('click', (event) => {
    if (event.target.classList.contains('disconnectButton')) {
      const pageName = event.target.dataset.pageName;
      // Implement functionality to disconnect the selected Facebook Page
      // This could involve sending a request to your backend to delete the connection
      alert(`Disconnect ${pageName}`);
    }
  });
  
  // Initial rendering of connected pages
  renderConnectedPages(); // You should define this function somewhere
  