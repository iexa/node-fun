import { add } from './myLib.js'
import assert from 'assert'

console.log('add()\nshould add 2 numbers')

try {
  assert.strictEqual(add(2, 3), 5)
  console.log('SUCCESS')
} catch (e) {
  console.log('FAIL', e)
}
