// socket.io server
///////////////////
import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import morgan from 'morgan'

const app = express()
const server = http.createServer(app)
const io = new Server(server)
app.use(morgan('dev'))

io.on('connection', (sock) => {
  console.log(`connected -> ${sock.client.id}`)
  sock.on('newData', (data) => {
    console.log(data)
    // sock.emit('serverSaid', { msg: 'csao!!!' })
  })

  sock.on('disconnect', () => {
    console.log(`disconnected -> ${sock.client.id}`)
  })
})

server.listen(8000, () =>
  console.log(`socket.io srv waiting for connections @:8000`)
)
