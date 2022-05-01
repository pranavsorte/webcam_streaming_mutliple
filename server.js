const path = require('path');
const express = require('express');
const WebSocket = require('ws');
const app = express();
// const fs = require('fs');

const WS_PORT  = 8888;
const HTTP_PORT = 8000;

const wsServer = new WebSocket.Server({port: WS_PORT}, ()=> console.log(`WS Server is listening at ${WS_PORT}`));


let connectedClients = [];
wsServer.on('connection', (ws, req)=>{
    console.log('Connected');
    connectedClients.push(ws);

    ws.on('message', data => {
        connectedClients.forEach((ws,i)=>{
            if(ws.readyState === ws.OPEN){
                // console.log(data);
                const arrayBuffer = data;
                // urlObject = URL.createObjectURL(new Blob([arrayBuffer]));
                ws.send(data);
            }else{
                connectedClients.splice(i ,1);
            }
        })
        
    });
});

app.get('/client',(req,res)=>res.sendFile(path.resolve(__dirname, './client.html')));
app.listen(HTTP_PORT, ()=> console.log(`HTTP server listening at ${HTTP_PORT}`));

function saveImage() {
    console.log("Hi");
}

// var img_name = document.getElementById("image");
// img_name.onchange(() => {
//     console.log("Dexosn");
// })