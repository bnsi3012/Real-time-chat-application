const express= require('express');
const app= express();
const http = require('http');
const server=http.createServer(app);
const socketio= require('socket.io');
const io= socketio(server);



const PORT=process.env.PORT || 3000;

app.use(express.static(__dirname+"/public"));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})

server.listen(PORT,()=>{
    // console.log(`listening to the port ${PORT}`);
})

io.on('connection',(socket)=>{
    // console.log('connected to the client id', socket.id);
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg);
        // iska matlab h ye sb sockets or clients ko msg bhejega except the emit karne vala client 
    })
})