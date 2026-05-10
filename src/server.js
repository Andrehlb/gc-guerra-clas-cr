const express = require('express');
const PORT = 3000;
const app = express();

app.get("/",(req, res)=>{
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.send(`
        <html>
            <head><meta charset="UTF-8"></head>
            <body>GC ⚔️ Guerra de Clãs, API rodando</body>Z
        </html>
    `);
});

const HOST = "127.0.0.1";

const server = app.listen(PORT, HOST, ()=>{
    console.log(`Servidor rodando em http://${HOST}:${PORT}`);
});

server.on("error", (error)=>{
    console.error("Erro ao iniciar o servidor:", error.message);
});
