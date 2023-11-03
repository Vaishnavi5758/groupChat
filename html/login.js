const socket =io('http://localhost:8000');

const form =document.getElementById('loginForm');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

const userName = prompt("enter your name to join chat");
console.log("hi");


const appends = (message,position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    appends(`You:${message}`,'right');
    socket.emit('send',message);
   // messageInput.value='';
})


socket.emit('new-user-joined',userName);

socket.on('user-joined',userName =>{
    appends(`${userName} joined the chat`,'right')
})


socket.on('receive',data =>{
    appends(`${data.userName} - ${data.message}`,'left');
   
   
})

//socket.on('send',data)