const socket= io();
let name;

do{
   name=prompt('please enter your name: ');
}while(!name)

let textarea=document.getElementById('textarea');
let message_area=document.getElementsByClassName('message_area')[0];




function appendChild(msg,type){
    let newDiv=document.createElement('div');
    let className= type;
    newDiv.classList.add(className,'message');

    let markup=`
    <h4>${msg.user}</h4>
    <p>${msg.message}</p> 
    `;

    newDiv.innerHTML=markup;
    message_area.appendChild(newDiv);
 }



function sendmessage(message){
    let msg ={
        user: name,
        message: message.trim()
    }

    appendChild(msg,'outgoing');
    textarea.value='';
    scrollToBottom();
    socket.emit('message',msg);
}

textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter')
    sendmessage(e.target.value);
})

socket.on('message',(msg)=>{
    //  console.log(msg);
     appendChild(msg,'incoming');
     scrollToBottom();
})

function scrollToBottom(){
    message_area.scrollTop=message_area.scrollHeight;
}