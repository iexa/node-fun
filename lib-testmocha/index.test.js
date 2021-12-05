// this one needs "nodeLinker: node-modules" in .yarnrc.yml only because below line
import { expect } from 'chai'

import { getPropertyWithDefault } from './index.js'

describe('getPropertyWithDefault - basic functionality', () => {
  it('returns correct val when prop. exists', () => {
    const person = { name: 'Fick Fack', age: 33, hairColor: 'gelb' }
    const actual = getPropertyWithDefault('name', 'N/A', person)
    expect(actual).to.equal('Fick Fack')
  })

  it('returns default value when prop. undefined', () => {
    const person = {}
    const actual = getPropertyWithDefault('name', 'N/A', person)
    expect(actual).to.equal('N/A')
  })
})
