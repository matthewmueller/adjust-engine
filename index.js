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
 * Default offsets
 */

var offsets = {
  bottom: 0,
  right: 0,
  left: 0,
  top: 0
}

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

  if (!options.attachment && !options.target) {
    throw new Error('adjust requires either an attachment or a target')
  }

  var offset = assign({}, offsets, options.offset)
  var attachment = options.attachment ? expr(options.attachment) : mirror(expr(options.target))
  var target = options.target ? expr(options.target) : mirror(expr(options.attachment))
  var orientation = attachment;

  return function adjust(attachment_position, target_position, viewport_position) {
    // use the width/height or compute the width/height
    var height = attachment_position.height || attachment_position.bottom - attachment_position.top
    var width = attachment_position.width || attachment_position.right - attachment_position.left

    // calculate the target height and width
    var target_height = target_position.height || target_position.bottom - target_position.top
    var target_width = target_position.width || target_position.right - target_position.left

    // get the offsets
    var offset_y = target.y * target_height - attachment.y * height
    var offset_x = target.x * target_width - attachment.x * width

    // update the position with the offsets
    var left = target_position.left + offset_x + offset.left - offset.right
    var top = target_position.top + offset_y + offset.top - offset.bottom
    var bottom = top + height + offset.bottom - offset.top
    var right = left + width + offset.right - offset.left

    // check if we need to flip
    if (options.flip && viewport_position) {
      // out of viewport on the left side or right side,
      // and we have room on the right or left
      if (left < viewport_position.left && target_position.right + width <= viewport_position.right) {
        // flip right
        left = target_position.right + offset.right - offset.left
        right = left + width + offset.left - offset.right
        orientation.x = mirror(orientation.x)
      } else
      if (right > viewport_position.right && target_position.left - width >= viewport_position.left) {
        // flip left
        right = target_position.left + offset.left - offset.right
        left = right - width + offset.right - offset.left
        orientation.x = mirror(orientation.x)
      }

      // out of viewport on the top or bottom,
      // and we have room on the bottom or top
      if (top < viewport_position.top && target_position.bottom + height <= viewport_position.bottom) {
        // flip bottom
        top = target_position.bottom + offset.bottom - offset.top
        bottom = top + height + offset.top - offset.bottom
        orientation.y = mirror(orientation.y)
      } else
      if (bottom > viewport_position.bottom && target_position.top - height >= viewport_position.top) {
        // flip top
        bottom = target_position.top + offset.top - offset.bottom
        top = bottom - height + offset.bottom - offset.top
        orientation.y = mirror(orientation.y)
      }
    }

    return {
      top: top,
      left: left,
      width: width,
      height: height,
      right: left + width,
      bottom: top + height,
      orientation: expr(orientation)
    }
  }
}
