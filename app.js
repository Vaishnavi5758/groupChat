//const { Socket } = require("engine.io");

const io = require("socket.io")(8000);
const users={};

io.on('connection',socket =>{
 socket.on('new-user-joined',userName =>{
    console.log("New User" , userName);
  users[socket.id] =userName;
  socket.broadcast.emit('user-joined',userName);
 });

 socket.on('send',message =>{
  socket.broadcast.emit('receive',{message : message, userName: users[socket.id]})
 });

})