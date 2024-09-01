//Requires
const express = require('express')
const app = express()
const http = require('http')
const { Server } = require('socket.io')
const path = require('path');

const server = http.createServer(app)

const io = new Server(server)

io.on('connection', (socket) => {
    socket.on('productUpdated', (data) => {
        io.emit('updateProduct', data);
    });
})

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`)
})

const port = process.env.PORT || 3000;
server.listen(port, () => {
        console.log(`Server running at port ${port}`)
})