import http from 'http'

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = ''
    req.on('data', (chunk) => (body += chunk))
    req.on('close', () => console.log(`received: ${body}`))
    res.writeHead(201)
    res.end('csao')
  } else {
    res.writeHead(200)
    res.end('hello')
  }
})

server.listen(8080, () => console.log('started.'))

