// Welcome User
let currentUser = prompt("Enter your username") || "Guest";
document.getElementById("welcome").innerText = "Welcome, " + currentUser;

// Users init
let initialUsers = ["Mohd Hanif","Friend1","Friend2","Friend3"];
let users = JSON.parse(localStorage.getItem("users")) || {};
initialUsers.forEach(u=>{ if(!users[u]) users[u]=0; });
localStorage.setItem("users", JSON.stringify(users));

// Devices setup (5 per user by default)
let devices = JSON.parse(localStorage.getItem("devices")) || [];
for(let i=1;i<=5;i++) if(!devices.includes(i)) devices.push(i);

// Earnings
let earnings = users[currentUser] || 0;

// Leaderboard toggle
let leaderboardVisible = false;

// Render devices
function renderDevices(){
    const devicesDiv = document.getElementById("devices");
    devicesDiv.innerHTML="";
    devices.forEach(dev=>{
        let status = localStorage.getItem("device_"+dev) || "disconnected";
        let multiplier = (status==="connected")?1.5:1.0;
        let div = document.createElement("div");
        div.className="device";
        div.innerHTML = `<strong>Device ${dev}</strong><br>
                         <span class="multiplier">x${multiplier}</span><br>
                         <button onclick="toggleDevice(${dev})">${status==="connected"?"Disconnect":"Connect"}</button>`;
        devicesDiv.appendChild(div);
    });
}
renderDevices();

// Toggle device
function toggleDevice(dev){
    let key = "device_"+dev;
    let status = localStorage.getItem(key) || "disconnected";
    localStorage.setItem(key,status==="connected"?"disconnected":"connected");
    renderDevices();
}

// Animate earnings
function animateEarnings(elem,to){
    let start = parseFloat(elem.innerText);
    let diff = to-start;
    let steps = 10;
    let stepVal = diff/steps;
    let i=0;
    let anim = setInterval(()=>{
        if(i>=steps){ clearInterval(anim); return; }
        start+=stepVal;
        elem.innerText=start.toFixed(3);
        i++;
    },50);
}

// Update earnings
function updateEarnings(){
    let totalMultiplier=1.0;
    devices.forEach(dev=>{
        if(localStorage.getItem("device_"+dev)==="connected") totalMultiplier+=0.5;
    });
    earnings+=0.01*totalMultiplier;
    users[currentUser]=parseFloat(earnings.toFixed(3));
    localStorage.setItem("users",JSON.stringify(users));
    animateEarnings(document.getElementById("earnings"),earnings);

    // Network earnings
    let network = Object.values(users).reduce((a,b)=>a+b,0);
    animateEarnings(document.getElementById("networkEarnings"),network);

    // Leaderboard update
    if(leaderboardVisible) renderLeaderboard();
}
setInterval(updateEarnings,1000);

// Render leaderboard
function renderLeaderboard(){
    const lb = document.getElementById("leaderboard");
    lb.innerHTML="";
    let sorted = Object.entries(users).sort((a,b)=>b[1]-a[1]);
    sorted.forEach(u=>{
        let li=document.createElement("li");
        li.innerText=`${u[0]} : ${u[1].toFixed(3)}`;
        lb.appendChild(li);
    });
}

// Admin functions
function addUser(){
    let newUser=document.getElementById("newUser").value.trim();
    if(newUser && !users[newUser]){
        users[newUser]=0;
        localStorage.setItem("users",JSON.stringify(users));
        alert(`${newUser} added`);
        document.getElementById("newUser").value="";
    }
}

function removeUser(){
    let username=prompt("Enter username to remove:");
    if(username && users[username]){
        delete users[username];
        localStorage.setItem("users",JSON.stringify(users));
        alert(`${username} removed`);
    } else alert("User not found!");
}

function resetEarnings(){
    Object.keys(users).forEach(u=>users[u]=0);
    localStorage.setItem("users",JSON.stringify(users));
    earnings=0;
    document.getElementById("earnings").innerText=earnings.toFixed(3);
    document.getElementById("networkEarnings").innerText=0;
    alert("All earnings reset!");
}

function toggleLeaderboard(){
    leaderboardVisible=!leaderboardVisible;
    document.getElementById("leaderboardCard").style.display = leaderboardVisible?"block":"none";
    if(leaderboardVisible) renderLeaderboard();
}
function addUser(){
    let newUser=document.getElementById("newUser").value.trim();
    if(newUser && !users[newUser]){
        users[newUser]=0;
        localStorage.setItem("users",JSON.stringify(users));
        alert(`${newUser} added`);
        document.getElementById("newUser").value="";
        // Refresh dashboard immediately
        renderDevices();
        updateEarnings(); // optional: network earnings update
        if(leaderboardVisible) renderLeaderboard(); // leaderboard update if visible
    }
}
function addUser(){
    let newUser = document.getElementById("newUser").value.trim();
    if(newUser && !users[newUser]){
        users[newUser] = 0;
        localStorage.setItem("users", JSON.stringify(users));
        alert(`${newUser} added`);
        document.getElementById("newUser").value = "";

        // --- Add this part ---
        renderDevices();                // dashboard refresh
        updateEarnings();               // earnings update
        if(leaderboardVisible) renderLeaderboard(); // leaderboard update
    }
}
