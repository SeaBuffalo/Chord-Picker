const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    height: 800,
    width: 1000,
  });
  win.loadFile("./dist/angular-chord-picker/index.html");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
})

app.on("windows-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});