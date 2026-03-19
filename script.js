let earning = 0;
let running = false;
let currentUser = "";
let devices = [];
let loggedInUsers = JSON.parse(localStorage.getItem("loggedInUsers")) || [];

// ADMIN: Add new user
function addUser(){
  const newUser = document.getElementById("newUser").value.trim();
  if(!newUser){ alert("Enter username"); return; }

  if(!localStorage.getItem(newUser)){
    localStorage.setItem(newUser, 0);
    alert(`User "${newUser}" added to network!`);
  } else {
    alert("User already exists!");
  }
  document.getElementById("newUser").value = "";
}

// Save devices
function saveDevices(){
  if(currentUser) localStorage.setItem(currentUser+"_devices", JSON.stringify(devices));
}

// Render devices + multiplier + status
function renderDevices(){
  const divParent = document.getElementById("devices");
  divParent.innerHTML = "";
  let activeDevices = 0;

  devices.forEach(d=>{
    if(d.running){
      activeDevices++;
      const div = document.createElement("div");
      div.className = "device";
      div.id = "device"+d.id;
      div.innerHTML = `Device ${d.id} <button onclick="disconnect(${d.id})">Disconnect</button>`;
      divParent.appendChild(div);
    }
  });

  const multiplierSpan = document.getElementById("multiplier");
  const status = document.getElementById("status");

  if(activeDevices>0){
    let multi = 1+(activeDevices-1)*0.5;
    multiplierSpan.innerText=`x${multi.toFixed(1)}`;

    if(activeDevices>2){
      status.innerText=`Connected x${multi.toFixed(1)} (Extra Power Active!)`;
      status.style.color="#ff5722";
    } else {
      status.innerText=`Connected x${multi.toFixed(1)}`;
      status.style.color="#28a745";
    }
  } else {
    multiplierSpan.innerText="";
    status.innerText="Not Connected";
    status.style.color="#555";
  }
}

// Disconnect device
function disconnect(id){
  const device = devices.find(d=>d.id===id);
  if(device) device.running=false;
  saveDevices();
  renderDevices();
}

// Connect device
function connect(){
  const deviceId = devices.length+1;
  devices.push({id:deviceId, running:true});
  saveDevices();
  renderDevices();
  running=true;
}

// Load user + devices
window.onload = function(){
  const savedUser = localStorage.getItem("currentUser");
  if(savedUser){
    currentUser=savedUser;
    let savedEarning=localStorage.getItem(currentUser);
    if(savedEarning) earning=parseFloat(savedEarning);

    document.getElementById("user").innerText=currentUser;
    document.getElementById("earn").innerText=earning.toFixed(3);
    document.getElementById("loginBox").style.display="none";
    document.getElementById("app").style.display="block";

    devices=JSON.parse(localStorage.getItem(currentUser+"_devices")) || [];
    renderDevices();
    updateTopEarners();
  }
}

// Login with single device restriction
function login(){
  let username=document.getElementById("username").value.trim();
  if(!username){ alert("Enter username"); return; }

  if(loggedInUsers.includes(username)){
    alert("This username is already logged in on another device!");
    return;
  }

  loggedInUsers.push(username);
  localStorage.setItem("loggedInUsers", JSON.stringify(loggedInUsers));

  currentUser=username;
  localStorage.setItem("currentUser", currentUser);

  let saved=localStorage.getItem(currentUser);
  if(saved) earning=parseFloat(saved);
  document.getElementById("user").innerText=currentUser;
  document.getElementById("earn").innerText=earning.toFixed(3);

  document.getElementById("loginBox").style.display="none";
  document.getElementById("app").style.display="block";

  devices=JSON.parse(localStorage.getItem(currentUser+"_devices")) || [];
  renderDevices();
  updateTopEarners();
}

// Earnings loop
setInterval(()=>{
  if(!running) return;

  let activeDevices=devices.filter(d=>d.running).length;
  if(activeDevices===0) return;

  let multiplier=1+(activeDevices-1)*0.5;
  earning+=0.001*multiplier;
  document.getElementById("earn").innerText=earning.toFixed(3);

  if(currentUser) localStorage.setItem(currentUser, earning);
  updateTopEarners();
},1000);

// Sorted Top Earners
function updateTopEarners(){
  const earnersList=document.getElementById("earnersList");
  earnersList.innerHTML="";

  let users=[];
  for(let key in localStorage){
    if(localStorage.hasOwnProperty(key) && key!=="currentUser" && !key.endsWith("_devices") && key!=="loggedInUsers"){
      users.push({name:key, earn:parseFloat(localStorage.getItem(key))});
    }
  }

  users.sort((a,b)=>b.earn - a.earn);

  users.slice(0,10).forEach(u=>{
    const li=document.createElement("li");
    li.innerText=`${u.name}: ${u.earn.toFixed(3)}`;
    earnersList.appendChild(li);
  });
}

// Remove from loggedInUsers on page unload
window.addEventListener("beforeunload",function(){
  if(currentUser){
    loggedInUsers=loggedInUsers.filter(u=>u!==currentUser);
    localStorage.setItem("loggedInUsers",JSON.stringify(loggedInUsers));
  }
});
