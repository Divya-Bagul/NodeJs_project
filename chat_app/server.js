const express = require('express')
const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket 
const io = require('socket.io')(http)
var data = {};
io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        // console.log(msg);
        socket.broadcast.emit('message', msg)
    })
    socket.on('client-conenect', (username) => {
        data[socket.id]=username;
        socket.broadcast.emit('client-is-connect', username)
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('client-is-disconnect',user=data[socket.id])
        delete data[socket.id];
    })
})