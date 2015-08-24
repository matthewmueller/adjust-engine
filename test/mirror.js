/**
 * Module Dependencies
 */

var mirror = require('../lib/mirror')
var assert = require('assert')

describe('mirror', function() {
  it('should mirror whatever its given', function() {
    assert.deepEqual({ x: 0, y: 0 }, mirror({ x: 1, y: 1 }))
    assert.deepEqual({ x: 1, y: 1 }, mirror({ x: 0, y: 0 }))
    assert.deepEqual({ x: 1, y: 0 }, mirror({ x: 0, y: 1 }))
    assert.deepEqual({ x: 0, y: 1 }, mirror({ x: 1, y: 0 }))
    assert.deepEqual({ x: .5, y: .5 }, mirror({ x: .5, y: .5 }))
    assert.deepEqual({ x: .3, y: .6 }, mirror({ x: .7, y: .4 }))
  })
})
