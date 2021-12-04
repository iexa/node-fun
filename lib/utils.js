const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const users = [{ email: 'fasz@farok.net', id: 1, name: 'Big', verified: false }]

const getNewUser = async (id) => {
  await delay(200)
  const user = users.find((u) => u.id === id)
  if (!user) throw new Error('user does not exist')
  return user
}

const mapObjToArray = (o, cb) => {
  const res = []
  for (const [k, v] of Object.entries(o)) res.push(cb(k, v, o))
  return res
}

module.exports = { getNewUser, mapObjToArray }
