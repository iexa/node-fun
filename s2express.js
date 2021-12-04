import express from 'express'
import morgan from 'morgan'

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('tiny'))

const db = []

app.post('/todo', async (req, res) => {
  const newTodo = { id: Date.now(), text: req.body.text }
  db.push(newTodo)
  res.status(201).json(newTodo)
})

app.get('/todos', async (req, res) => {
  res.json(db)
})

app.listen(8080, () => console.log('started at http://localhost:8080/'))
