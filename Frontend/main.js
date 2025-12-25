const { app, BrowserWindow } = require("electron");
const { spawn } = require("child_process");
const path = require("path");
const { create } = require("domain");

let pyProcess = null;

function startPython() {
  const script = path.join(__dirname, "../Backend/main.py");

  pyProcess = spawn("python", ["-m", "uvicorn", "main:app", "--port", "8000"], {
    cwd: path.join(__dirname, "../Backend/"),
  });

  pyProcess.stdout.on("data", (data) => {
    console.log(`[PYTHON]: ${data}`);
  });

  pyProcess.stderr.on("data", (data) => {
    console.error(`[PYTHON ERROR]: ${data}`);
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(() => {
  startPython();
  createWindow();
});

app.on("window-all-closed", () => {
  if (pyProcess) pyProcess.kill();
  app.quit();
});
