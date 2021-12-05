import express from 'express'
const app = express()

app.get('/hi', (req, res) => {
  res.send('Hi you all!')
})

export default app
