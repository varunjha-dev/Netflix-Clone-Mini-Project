// Replace with your Google Sheets API key and spreadsheet ID
const apiKey = "AIzaSyDXc_F8RzkI_uaXwo8KGqIL-UE_2YlxjEU";
const spreadsheetId = "1jGCVs8NBXGWelNcGL0cV6JAjoe70KznEUtt4Qw2IWHs";

function validateLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Call the Google Sheets API to check credentials
  checkCredentials(username, password);
}

// ... (Your existing JavaScript code)

function hideLoginContainer() {
  const loginContainer = document.getElementById("loginContainer");
  loginContainer.style.display = "none";
}

function showTransition() {
  const transitionVideo = document.getElementById("transitionVideo");
  const transitionSound = document.getElementById("transitionSound");

  // Show transition elements
  transitionVideo.style.display = "block";
  transitionSound.style.display = "block";

  // Play transition video and sound
  transitionVideo.play();
  transitionSound.play();
}

function checkCredentials(username, password) {
  gapi.client.init({
    apiKey: apiKey,
  });

  gapi.client.load("sheets", "v4", () => {
    gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: spreadsheetId,
        range: "Sheet1", // Update with your sheet name
      })
      .then(
        (response) => {
          const data = response.result.values;
          const isValid = validateUser(data, username, password);

          if (isValid) {
            document.getElementById("errorMsg").innerText =
              "Login successful! Redirecting...";

            // Hide login container
            hideLoginContainer();

            // Show transition video and sound
            showTransition();

            // Redirect to Netflix Clone project after a delay
            setTimeout(() => {
              window.location.href = "index.html";
            }, 17000); // Adjust the delay as needed (17000 milliseconds = 17 seconds)
          } else {
            document.getElementById("errorMsg").innerText =
              "Invalid credentials.";
          }
        },
        (error) => {
          console.error("Error loading Google Sheets API:", error);
        }
      );
  });
}
function validateUser(data, username, password) {
  // Assuming the sheet structure is: | Username | Password |
  for (let i = 1; i < data.length; i++) {
    const storedUsername = data[i][0];
    const storedPassword = data[i][1];

    if (username === storedUsername && password === storedPassword) {
      return true; // Valid credentials
    }
  }

  return false; // Invalid credentials
}

// Load Google Sheets API client
gapi.load("client", () => {
  console.log("Google Sheets API client loaded.");
});
