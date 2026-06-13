const express = require('express');
const appConfig = require('./config/appConfig'); 

const app = express();

app.get("/",(req, res)=>{
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.send(`
        <html>
            <head><meta charset="UTF-8"></head>
            <body>${appConfig.appName} ⚔️ ${appConfig.appContext} rodando</body>
        </html>
    `);
});

const server = app.listen(appConfig.port, appConfig.host, () => {
    console.log(`Servidor rodando em http://${appConfig.host}:${appConfig.port}`);
});

server.on("error", (error)=>{
    console.error("Erro ao iniciar o servidor:", error.message);
});
