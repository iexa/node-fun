import http from 'http'
import cluster from 'cluster'
import os from 'os'

const pid = process.pid

function serverProcess() {
  http
    .createServer((req, res) => {
      for (let i = 0; i < 1e7; i++) {}
      res.end(`handled by pid ${pid}`)
    })
    .listen(8000, (_) => console.log(`started ${pid}`))

  setTimeout(() => process.exit(1), Math.random() * 9000)
}

if (cluster.isPrimary) {
  const cpus = os.cpus().length
  console.log(`forking for ${cpus} CPUs`)
  for (let i = 0; i < cpus; i++) {
    cluster.fork()
  }
  Object.values(cluster.workers).forEach((worker) =>
    worker.send(`hello you ${worker.id}`)
  )
  cluster.on('exit', (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`worker ${worker.id} crashed. starting new worker...`)
      cluster.fork()
    }
  })
} else {
  process.on('message', (msg) => console.log(`message from master: ${msg}`))
  serverProcess()
}
