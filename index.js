/**
 * Module Dependencies
 */

var expr = require('./lib/expression')
var assign = require('object-assign')
var mirror = require('./lib/mirror')

/**
 * Export `Adjust`
 */

module.exports = Adjust

/**
 * Initialize `Adjust`
 *
 * @param {Object} options
 * @return {Object}
 */

function Adjust(options) {
  options = options || {}
  options.flip = undefined === options.flip ? true : options.flip
  options.offset = options.offset || {}

  // default to center middle
  if (!options.attachment && !options.target) {
    options.attachment = 'center middle'
  }

  var offset = assign({ x: 0, y: 0 }, options.offset)
  var attachment = options.attachment ? expr(options.attachment) : mirror(expr(options.target))
  var target = options.target ? expr(options.target) : mirror(expr(options.attachment))

  return function adjust(attachment_position, target_position, viewport_position) {
    // use the width/height or compute the width/height
    var height = attachment_position.height || attachment_position.bottom - attachment_position.top
    var width = attachment_position.width || attachment_position.right - attachment_position.left
    var orientation = assign({}, attachment);

    // calculate the target height and width
    var target_height = target_position.height || target_position.bottom - target_position.top
    var target_width = target_position.width || target_position.right - target_position.left

    // get the offsets
    var offset_y = target.y * target_height - attachment.y * height
    var offset_x = target.x * target_width - attachment.x * width

    // update the position with the offsets
    var left = target_position.left + offset_x + offset.x
    var top = target_position.top + offset_y + offset.y
    var bottom = top + height
    var right = left + width

    // check if we need to flip
    if (options.flip && viewport_position) {
      // out of viewport on the left side or right side,
      // and we have room on the right or left
      if (left < viewport_position.left && target_position.right + width <= viewport_position.right) {
        // flip right
        left = target_position.right - offset.x
        right = left + width
        orientation.x = mirror(orientation.x)
      } else
      if (right > viewport_position.right && target_position.left - width >= viewport_position.left) {
        // flip left
        right = target_position.left - offset.x
        left = right - width
        orientation.x = mirror(orientation.x)
      }

      // out of viewport on the top or bottom,
      // and we have room on the bottom or top
      if (top < viewport_position.top && target_position.bottom + height <= viewport_position.bottom) {
        // flip bottom
        top = target_position.bottom - offset.y
        bottom = top + height
        orientation.y = mirror(orientation.y)
      } else
      if (bottom > viewport_position.bottom && target_position.top - height >= viewport_position.top) {
        // flip top
        bottom = target_position.top - offset.y
        top = bottom - height
        orientation.y = mirror(orientation.y)
      }
    }

    return {
      top: top,
      left: left,
      width: width,
      height: height,
      right: right,
      bottom: bottom,
      orientation: expr(orientation)
    }
  }
}
