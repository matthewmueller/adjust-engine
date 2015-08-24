/**
 * Export `expression`
 */

module.exports = expression

/**
 * Parse the expression
 *
 * @param {String} expr
 * @return {Object}
 */

function expression(expr) {
  var tokens = expr.split(/\s+/)
  var out = {}

  // token defaults
  if (tokens.length === 1) {
    switch(tokens[0]) {
      case 'middle': tokens.push('center'); break
      case 'bottom': tokens.push('center'); break
      case 'center': tokens.push('middle'); break
      case 'right': tokens.push('middle'); break
      case 'left': tokens.push('middle'); break
      case 'top': tokens.push('center'); break
    }
  }

  // turn strings into numbers
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
