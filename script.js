let earning = 0;
let running = false;
let currentUser = "";
let devices = [];

// Save devices
function saveDevices() {
  if (currentUser) localStorage.setItem(currentUser + "_devices", JSON.stringify(devices));
}

// Render devices + multiplier
function renderDevices() {
  const divParent = document.getElementById("devices");
  divParent.innerHTML = "";
  let activeDevices = 0;

  devices.forEach(d => {
    if (d.running) {
      activeDevices++;
      const div = document.createElement("div");
      div.className = "device";
      div.id = "device" + d.id;
      div.innerHTML = `Device ${d.id} <button onclick="disconnect(${d.id})">Disconnect</button>`;
      divParent.appendChild(div);
    }
  });

  const multiplierSpan = document.getElementById("multiplier");
  if (activeDevices > 0) {
    let multi = 1 + (activeDevices - 1) * 0.5;
    multiplierSpan.innerText = `x${multi.toFixed(1)}`;
  } else multiplierSpan.innerText = "";
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

// Load user + devices
window.onload = function() {
  const savedUser = localStorage.getItem("currentUser");
  if (savedUser) {
    currentUser = savedUser;
    let savedEarning = localStorage.getItem(currentUser);
    if (savedEarning) earning = parseFloat(savedEarning);

    document.getElementById("user").innerText = currentUser;
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("app").style.display = "block";

    devices = JSON.parse(localStorage.getItem(currentUser + "_devices")) || [];
    renderDevices();
    updateTopEarners();
  }
}

// Login
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

// Sorted Top Earners
function updateTopEarners() {
  const earnersList = document.getElementById("earnersList");
  earnersList.innerHTML = "";

  let users = [];
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key) && key !== "currentUser" && !key.endsWith("_devices")) {
      users.push({name: key, earn: parseFloat(localStorage.getItem(key))});
    }
  }

  users.sort((a,b) => b.earn - a.earn);

  users.forEach(u => {
    const li = document.createElement("li");
    li.innerText = `${u.name}: ${u.earn.toFixed(3)}`;
    earnersList.appendChild(li);
  });
}
