alert("JS Working");
let earning = 0;
let running = false;
let currentUser = "";

function login() {
  const username = document.getElementById("username").value;

  if (username === "") {
    alert("Enter username");
    return;
  }

  currentUser = username;

  let saved = localStorage.getItem(username);
  if (saved) {
    earning = parseFloat(saved);
  }

  document.getElementById("user").innerText = username;
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("app").style.display = "block";
}

function connect() {
  document.getElementById("status").innerText = "Connected";
  running = true;
}

setInterval(() => {
  if (running) {
    earning += 0.02;
    document.getElementById("earn").innerText = earning.toFixed(2);

    if (currentUser !== "") {
      localStorage.setItem(currentUser, earning);
    }
  }
}, 1000);
