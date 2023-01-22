// const { name } = require("ejs");



const socket = io()

var namedata;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
let connectUser = document.querySelector('#connect')
do {
    namedata = prompt('Please enter your name: ')
    
} while(!namedata)
socket.emit('client-conenect', namedata)
textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
       

    }
})  


function sendMessage(message) {
    let msg = {
        user: namedata,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server 
    socket.emit('message', msg)
   

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}
// Recieve messages


socket.on('message', (msg) => {
   
    appendMessage(msg, 'incoming')
    scrollToBottom()
})
socket.on('client-is-connect', (username) => {
  
    let mainDiv = document.createElement('div')
    let userjoin = `
         <h4>${username} is joined chat</h4>
     `
     console.log(userjoin);
     mainDiv.innerHTML= userjoin;
     connectUser.appendChild(mainDiv)
     
 })
 socket.on('client-is-disconnect', (username) => {
  
    let mainDiv = document.createElement('div')
    let userjoin = `
         <h4>${username} is left chat</h4>
     `
     console.log(userjoin);
     mainDiv.innerHTML= userjoin;
     connectUser.appendChild(mainDiv)
     
 })

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}