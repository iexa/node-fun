const { getNewUser, mapObjToArray } = require('./utils')

describe('mapObjToArray', () => {
  test('maps values to array using callback', () => {
    const res = mapObjToArray({ age: 28, height: 184 }, (k, v) => v + 10)
    expect(res).toEqual([38, 194])
  })
  test('callback gets called', () => {
    const mockCB = jest.fn()
    const result = mapObjToArray({ age: 28, height: 184 }, mockCB)
    expect(mockCB).toHaveBeenCalledTimes(2)
  })
})

describe('getNewUser', () => {
  test('it gets user', async () => {
    const user = await getNewUser(1)
    expect(user).toBeTruthy()
    expect(user.id).toBe(1)
  })

  test('no user found', async () => {
    expect.assertions(1) // it should error out, that's why it's here
    try {
      const user = await getNewUser(-Infinity)
    } catch (e) {
      expect(e).toBeTruthy()
    }
  })
})
