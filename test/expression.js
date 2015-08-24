/**
 * Module Dependencies
 */

var expression = require('../lib/expression')
var assert = require('assert')

describe('expression', function() {
  it('should have good defaults', function() {
    assert.deepEqual(expression('top'), { x: .5, y: 0 })
    assert.deepEqual(expression('bottom'), { x: .5, y: 1 })
    assert.deepEqual(expression('left'), { x: 0, y: .5 })
    assert.deepEqual(expression('right'), { x: 1, y: .5 })
    assert.deepEqual(expression('middle'), { x: .5, y: .5 })
    assert.deepEqual(expression('center'), { x: .5, y: .5 })
  })

  it('should work with any variation', function() {
    assert.deepEqual(expression('top left'), { x: 0, y: 0 })
    assert.deepEqual(expression('top center'), { x: .5, y: 0 })
    assert.deepEqual(expression('top right'), { x: 1, y: 0 })

    assert.deepEqual(expression('left middle'), { x: 0, y: .5 })
    assert.deepEqual(expression('center middle'), { x: .5, y: .5 })
    assert.deepEqual(expression('right middle'), { x: 1, y: .5 })

    assert.deepEqual(expression('bottom left'), { x: 0, y: 1 })
    assert.deepEqual(expression('bottom center'), { x: .5, y: 1 })
    assert.deepEqual(expression('bottom right'), { x: 1, y: 1 })
  })
})
