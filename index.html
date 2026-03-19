let earning = 0;
let running = false;
let currentUser = "";
let devices = [];

// Save devices to localStorage
function saveDevices() {
  if (currentUser) {
    localStorage.setItem(currentUser + "_devices", JSON.stringify(devices));
  }
}

// Render devices buttons
function renderDevices() {
  const divParent = document.getElementById("devices");
  divParent.innerHTML = "";
  devices.forEach(d => {
    if (d.running) {
      const div = document.createElement("div");
      div.className = "device";
      div.id = "device" + d.id;
      div.innerHTML = `Device ${d.id} <button onclick="disconnect(${d.id})">Disconnect</button>`;
      divParent.appendChild(div);
    }
  });
}

// Disconnect a device
function disconnect(id) {
  const device = devices.find(d => d.id === id);
  if (device) device.running = false;
  saveDevices();
  renderDevices();
}

// Connect a new device
function connect() {
  const deviceId = devices.length + 1;
  devices.push({id: deviceId, running: true});
  saveDevices();
  renderDevices();
  running = true;
}

// Load user and devices on page load
window.onload = function() {
  const savedUser = localStorage.getItem("currentUser");
  if (savedUser) {
    currentUser = savedUser;

    let savedEarning = localStorage.getItem(currentUser);
    if (savedEarning) earning = parseFloat(savedEarning);

    document.getElementById("user").innerText = currentUser;
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("app").style.display = "block";

    // Load devices
    devices = JSON.parse(localStorage.getItem(currentUser + "_devices")) || [];
    renderDevices();

    updateTopEarners();
  }
}

// Login function
function login() {
  const username = document.getElementById("username").value;
  if (!username) { alert("Enter username"); return; }

  currentUser = username;
  localStorage.setItem("currentUser", currentUser);

  let saved = localStorage.getItem(currentUser);
  if (saved) earning = parseFloat(saved);

  document.getElementById("user").innerText = currentUser;
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("app").style.display = "block";

  // Load devices
  devices = JSON.parse(localStorage.getItem(currentUser + "_devices")) || [];
  renderDevices();

  updateTopEarners();
}

// Earnings loop
setInterval(() => {
  if (!running) return;

  let activeDevices = devices.filter(d => d.running).length;
  if (activeDevices === 0) return;

  let multiplier = 1 + (activeDevices - 1) * 0.5;
  earning += 0.001 * multiplier;
  document.getElementById("earn").innerText = earning.toFixed(3);

  if (currentUser) localStorage.setItem(currentUser, earning);
  updateTopEarners();
}, 1000);

// Top Earners leaderboard
function updateTopEarners() {
  const earnersList = document.getElementById("earnersList");
  earnersList.innerHTML = "";
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key) && key !== "currentUser" && !key.endsWith("_devices")) {
      const li = document.createElement("li");
      li.innerText = `${key}: ${parseFloat(localStorage.getItem(key)).toFixed(3)}`;
      earnersList.appendChild(li);
    }
  }
}
