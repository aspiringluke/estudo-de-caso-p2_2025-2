import { app, BrowserWindow } from "electron";
import server from "./server/app.js";

function criarJanela()
{
    const window = new BrowserWindow({height: 1080/2, width: 1920/2});

    window.loadURL("http://localhost:4040");
}

app.whenReady().then( () => {
    criarJanela();
});

app.on('window-all-closed',() => {
    if (process.platform !== 'darwin')
    app.quit();
});