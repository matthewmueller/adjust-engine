/**
 * Module Dependencies
 */

var assert = require('assert')
var Adjust = require('..')

describe('adjust-engine', function() {

  it('target: center middle, attachment: center middle', function() {
    var adjust = Adjust({
      attachment: 'center middle',
      target: 'center middle'
    });

    var attachment = {
      height: 50,
      width: 50
    }

    var target = {
      top: 100,
      left: 320,
      right: 520,
      bottom: 300
    }

    var coords = adjust(attachment, target)
    assert.deepEqual(coords, {
      top: 175,
      left: 395,
      width: 50,
      height: 50,
      right: 445,
      bottom: 225,
      orientation: 'center middle'
    })
  })

  it('target: left bottom, attachment: center middle', function() {
    var adjust = Adjust({
      attachment: 'center middle',
      target: 'left bottom'
    });

    var attachment = {
      height: 50,
      width: 50
    }

    var target = {
      bottom: 100,
      right: 100,
      left: 0,
      top: 0
    }

    var coords = adjust(attachment, target)
    assert.deepEqual(coords, {
      top: 75,
      left: -25,
      width: 50,
      height: 50,
      right: 25,
      bottom: 125,
      orientation: 'center middle'
    })
  })

  it('should flip to the right when there is not enough room on the left', function() {
    var adjust = Adjust({
      attachment: 'right middle',
      target: 'left middle'
    });

    var attachment = {
      bottom: 50,
      right: 50,
      left: 0,
      top: 0
    }

    var target = {
      bottom: 100,
      right: 100,
      left: 0,
      top: 0
    }

    var viewport = {
      left: 0,
      top: 0,
      right: 150,
      bottom: 100
    }

    var coords = adjust(attachment, target, viewport);
    assert.deepEqual(coords, {
      top: 25,
      left: 100,
      width: 50,
      height: 50,
      right: 150,
      bottom: 75,
      orientation: 'left middle'
    })
  })

  it('should flip to the left when there is not enough room on the right', function() {
    var adjust = Adjust({
      attachment: 'left middle',
      target: 'right middle'
    });

    var attachment = {
      height: 50,
      width: 50
    }

    var target = {
      bottom: 100,
      right: 150,
      left: 50,
      top: 0
    }

    var viewport = {
      left: 0,
      top: 0,
      right: 125,
      bottom: 100
    }

    var coords = adjust(attachment, target, viewport);
    assert.deepEqual(coords, {
      top: 25,
      left: 0,
      width: 50,
      height: 50,
      right: 50,
      bottom: 75,
      orientation: 'right middle'
    })
  })

  it('should flip to the bottom when there is not enough room on the top', function() {
    var adjust = Adjust({
      attachment: 'center bottom',
      target: 'center top',
      offset: {
        y: -50,
        x: 10
      }
    });

    var attachment = {
      height: 50,
      width: 50
    }

    var target = {
      bottom: 100,
      right: 100,
      left: 0,
      top: 0
    }

    var viewport = {
      left: 0,
      top: 0,
      right: 100,
      bottom: 200
    }

    var coords = adjust(attachment, target, viewport);
    assert.deepEqual(coords, {
      top: 150,
      left: 35,
      width: 50,
      height: 50,
      right: 85,
      bottom: 200,
      orientation: 'center top'
    })
  })

//   it('should support offsets', function() {
//     var adjust = Adjust({
//       attachment: 'center middle',
//       target: 'left bottom',
//       offset: {
//         left: -25,
//         top: -25
//       }
//     });

//     var attachment = {
//       height: 50,
//       width: 50
//     }

//     var target = {
//       bottom: 110,
//       right: 110,
//       left: 10,
//       top: 10
//     }

//     var coords = adjust(attachment, target)
//     assert.deepEqual(coords, {
//       top: 60,
//       left: -40,
//       width: 50,
//       height: 50,
//       right: 10,
//       bottom: 110
//     })
//   })
})

describe('offsets', function() {

  it('should support top / left offsets', function() {
    var attachment = {
      height: 50,
      width: 50
    }

    var target = {
      left: 0,
      right: 50,
      top: 0,
      bottom: 50
    }

    var adjust = Adjust({
      attachment: 'center middle',
      target: 'center middle',
      offset: {
        x: 10,
        y: 10
      }
    })

    var coords = adjust(attachment, target)
    assert.deepEqual(coords, {
      top: 10,
      left: 10,
      width: 50,
      height: 50,
      right: 60,
      bottom: 60,
      orientation: 'center middle'
    })
  })

  it('should support negative offsets', function() {
    var attachment = {
      height: 50,
      width: 50
    }

    var target = {
      left: 0,
      right: 50,
      top: 0,
      bottom: 50
    }

    var adjust = Adjust({
      attachment: 'center middle',
      target: 'center middle',
      offset: {
        x: -10,
        y: -10
      }
    })

    var coords = adjust(attachment, target)
    assert.deepEqual(coords, {
      top: -10,
      left: -10,
      width: 50,
      height: 50,
      right: 40,
      bottom: 40,
      orientation: 'center middle'
    })
  })
})
