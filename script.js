let earning = 0;
let running = false;

function connect() {
  document.getElementById("status").innerText = "Connected";
  running = true;
}

setInterval(() => {
  if (running) {
    earning += 0.02;
    document.getElementById("earn").innerText = earning.toFixed(2);
  }
}, 1000);
