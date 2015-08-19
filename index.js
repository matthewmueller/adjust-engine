/**
 * Module Dependencies
 */

var assign = require('object-assign')

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
  options.attachment = options.attachment || 'center middle'
  options.target = options.target || options.attachment
  options.offset = options.offset || {}

  var attachment = expression(options.attachment)
  var offset = assign(offsets, options.offset)
  var target = expression(options.target)

  return function adjust(attachment_position, target_position, viewport_position) {
    // use the width/height or compute the width/height
    var height = attachment_position.height || attachment_position.bottom - attachment_position.top
    var width = attachment_position.width || attachment_position.right - attachment_position.left

    // get the offsets
    var offset_y = target_position.top + target_position.bottom * target.y - attachment.y * height
    var offset_x = target_position.left + target_position.right * target.x - attachment.x * width

    // update the top and left with the offsets
    var left = target_position.left + offset_x + offset.left
    var top = target_position.top + offset_y + offset.top
    var height = height - offset.top - offset.bottom
    var width = width - offset.left - offset.right
    var bottom = top + height + offset.bottom
    var right = left + width + offset.right

    // check if we need to flip
    if (options.flip && viewport_position) {
      // out of viewport on the left side or right side,
      // and we have room on the right or left
      if (left < viewport_position.left && target_position.right + width <= viewport_position.right) {
        left = target_position.right
        right = left + width
      } else
      if (right > viewport_position.right && target_position.left - width >= viewport_position.left) {
        right = target_position.left
        left = right - width
      }

      // out of viewport on the top or bottom,
      // and we have room on the bottom or top
      if (top < viewport_position.top && target_position.bottom + height <= viewport_position.bottom) {
        top = target_position.bottom
        bottom = top + height
      } else
      if (bottom > viewport_position.bottom && target_position.top - height >= viewport_position.top) {
        bottom = target_position.top
        top = bottom - height
      }
    }

    return {
      top: top,
      left: left,
      width: width,
      height: height,
      right: left + width,
      bottom: top + height
    }
  }
}

/**
 * Parse the expression
 *
 * @param {String} expr
 * @return {Object}
 */

function expression(expr) {
  var tokens = expr.split(/\s+/)
  var out = {}

  tokens.forEach(function(token, i) {
    switch (token) {
      case 'center': return out.x = 0.5
      case 'middle': return out.y = 0.5
      case 'bottom': return out.y = 1
      case 'right': return out.x = 1
      case 'left': return out.x = 0
      case 'top': return out.y = 0
      default:
        return i % 2
          ? out.y = percentage(token)
          : out.x = percentage(token)
    }
  })

  return out
}

/**
 * To percentage
 *
 * @param {String} val
 * @return {Number}
 */

function percentage (val) {
  var float = parseFloat(val)
  return isNaN(float) ? 0 : float / 100
}
