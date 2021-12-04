// socket.io client
///////////////////
import { io } from 'socket.io-client'

const createSockClient = (name, interval) => {
  const sock = io('http://localhost:8000/')

  sock.on('connect', () => {
    console.log(`client connected.`)
    setInterval((_) => {
      const rndNr = Math.ceil(Math.random() * 100)
      sock.emit('newData', `hello from ${name} plus a number: ${rndNr}`)
    }, interval)
  })

  sock.on('disconnect', () => {
    console.log(`client disconnected.`)
  })
}

createSockClient('manci #1', 1500)
createSockClient('pifti #33', 2500)
