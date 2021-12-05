// supertest is a HLA module for http testing
// it runs with mocha or jest, whatever, test fw. basically.
import request from 'supertest'
import app from './server.js'

describe('/hi endpoint works', () => {
  // asynch test needs to call done after done or done(error-msg) if fail
  it('replies with "Hi you all!" when a GET is sent', (done) => {
    request(app).get('/hi').expect('Hi you all!', done)
  })
})
