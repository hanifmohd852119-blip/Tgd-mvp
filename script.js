let earning = 0;
let running = false;
let currentUser = "";

// LOGIN FUNCTION
function login() {
  const username = document.getElementById("username").value;

  if (username === "") {
    alert("Enter username");
    return;
  }

  currentUser = username;

  // Load saved earning
  let saved = localStorage.getItem(username);
  if (saved) {
    earning = parseFloat(saved);
  }

  document.getElementById("user").innerText = username;
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("app").style.display = "block";
}

// CONNECT DEVICE
function connect() {
  document.getElementById("status").innerText = "Connected";
  running = true;
}

// EARNING LOOP
setInterval(() => {
  if (running) {
    earning += 0.02;

    document.getElementById("earn").innerText = earning.toFixed(2);

    // Save data
    if (currentUser !== "") {
      localStorage.setItem(currentUser, earning);
    }
  }
}, 1000);
