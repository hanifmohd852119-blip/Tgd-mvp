// Welcome User
let currentUser = prompt("Enter your username") || "Guest";
document.getElementById("welcome").innerText = "Welcome, " + currentUser;

// Users initialization
let initialUsers = ["Mohd Hanif","Friend1","Friend2","Friend3"];
let users = JSON.parse(localStorage.getItem("users")) || {};
initialUsers.forEach(u => { if(!users[u]) users[u] = 0; });
localStorage.setItem("users", JSON.stringify(users));

// Devices initialization (5 per user)
let devices = JSON.parse(localStorage.getItem("devices")) || [];
for(let i=1;i<=5;i++) if(!devices.includes(i)) devices.push(i);

// Earnings
let earnings = users[currentUser] || 0;

// Leaderboard visibility
let leaderboardVisible = false;

// Render devices
function renderDevices(){
    const devicesDiv = document.getElementById("devices");
    devicesDiv.innerHTML = "";

    devices.forEach(dev => {
        // Device key per user
        let status = localStorage.getItem("device_" + dev + "_" + currentUser) || "disconnected";
        let multiplier = (status==="connected") ? 1.5 : 1.0;

        let div = document.createElement("div");
        div.className = "device";
        div.innerHTML = `<strong>Device ${dev}</strong><br>
                         <span class="multiplier">x${multiplier}</span><br>
                         <button onclick="toggleDevice(${dev})">${status==="connected"?"Disconnect":"Connect"}</button>`;
        devicesDiv.appendChild(div);
    });
}
renderDevices();

// Toggle device
function toggleDevice(dev){
    let key = "device_" + dev + "_" + currentUser;
    let status = localStorage.getItem(key) || "disconnected";
    localStorage.setItem(key, status==="connected" ? "disconnected" : "connected");
    renderDevices();
}

// Animate earnings smoothly
function animateEarnings(elem, to){
    let start = parseFloat(elem.innerText);
    let diff = to - start;
    let steps = 10;
    let stepVal = diff / steps;
    let i = 0;
    let anim = setInterval(()=>{
        if(i>=steps){ clearInterval(anim); return; }
        start += stepVal;
        elem.innerText = start.toFixed(3);
        i++;
    }, 50);
}

// Update earnings for all users
function updateEarnings(){
    let totalNetwork = 0;

    Object.keys(users).forEach(u => {
        // Count connected devices per user
        let connectedDevices = devices.filter(dev => localStorage.getItem("device_" + dev + "_" + u) === "connected").length;
        let multiplier = 1 + connectedDevices * 0.5;

        users[u] += 0.01 * multiplier;
        users[u] = parseFloat(users[u].toFixed(3));
        totalNetwork += users[u];
    });

    localStorage.setItem("users", JSON.stringify(users));

    // Animate current user earnings
    animateEarnings(document.getElementById("earnings"), users[currentUser]);
    // Animate network earnings
    animateEarnings(document.getElementById("networkEarnings"), totalNetwork);

    // Update leaderboard if visible
    if(leaderboardVisible) renderLeaderboard();
}
setInterval(updateEarnings, 1000);

// Render leaderboard
function renderLeaderboard(){
    const lb = document.getElementById("leaderboard");
    lb.innerHTML = "";
    let sorted = Object.entries(users).sort((a,b)=>b[1]-a[1]);
    sorted.forEach(u=>{
        let li = document.createElement("li");
        li.innerText = `${u[0]} : ${u[1].toFixed(3)}`;
        lb.appendChild(li);
    });
}

// --- Admin Functions ---

// Add User
function addUser(){
    let newUser = document.getElementById("newUser").value.trim();
    if(newUser && !users[newUser]){
        users[newUser] = 0;
        localStorage.setItem("users", JSON.stringify(users));
        alert(`${newUser} added`);
        document.getElementById("newUser").value = "";

        // Dashboard + earnings refresh
        renderDevices();
        updateEarnings();
        if(leaderboardVisible) renderLeaderboard();
    }
}

// Remove User
function removeUser(){
    let username = prompt("Enter username to remove:");
    if(username && users[username]){
        delete users[username];
        localStorage.setItem("users", JSON.stringify(users));
        alert(`${username} removed`);
    } else alert("User not found!");
}

// Reset Earnings
function resetEarnings(){
    Object.keys(users).forEach(u => users[u] = 0);
    localStorage.setItem("users", JSON.stringify(users));
    earnings = 0;
    document.getElementById("earnings").innerText = earnings.toFixed(3);
    document.getElementById("networkEarnings").innerText = 0;
    alert("All earnings reset!");
}

// Toggle Leaderboard
function toggleLeaderboard(){
    leaderboardVisible = !leaderboardVisible;
    document.getElementById("leaderboardCard").style.display = leaderboardVisible ? "block" : "none";
    if(leaderboardVisible) renderLeaderboard();
}
let users = JSON.parse(localStorage.getItem("users")) || {};
initialUsers.forEach(u => { 
    if(!users[u]) users[u] = 0; 
});

// --- ADD THIS LINE ---
if(!users[currentUser]) users[currentUser] = 0;

localStorage.setItem("users", JSON.stringify(users));

// Initialize current earnings variable
let earnings = users[currentUser];
function addUser(){
    let newUser = document.getElementById("newUser").value.trim();
    if(newUser && !users[newUser]){
        users[newUser] = 0;
        localStorage.setItem("users", JSON.stringify(users));
        alert(`${newUser} added`);
        document.getElementById("newUser").value = "";

        // --- Dashboard + earnings refresh immediately ---
        renderDevices();                // devices list refresh
        updateEarnings();               // earnings update
        if(leaderboardVisible) renderLeaderboard(); // leaderboard update if visible
    }
}
function addUser(){
    let newUser = document.getElementById("newUser").value.trim();
    if(newUser && !users[newUser]){
        // Add new user with initial earnings
        users[newUser] = 0;
        localStorage.setItem("users", JSON.stringify(users));
        alert(`${newUser} added`);
        document.getElementById("newUser").value = "";

        // --- AI-task ready updates ---
        renderDevices();                // Refresh devices for dashboard
        updateEarnings();               // Update earnings for all users
        if(leaderboardVisible) renderLeaderboard(); // Refresh leaderboard if visible
    }
}
