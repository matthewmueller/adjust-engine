/**
 * Export `expression`
 *
 * @param {String|Object} expr
 * @return {Object|String}
 */

module.exports = function expr (expr) {
  return typeof expr === 'string'
    ? parse(expr)
    : compile(expr)
}

/**
 * Parse the expression
 *
 * @param {String} expr
 * @return {Object}
 */

function parse(expr) {
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
 * Compile an object into a string
 * the reverse of parse
 *
 * @param {Object} n
 * @return {String}
 */

function compile (expr) {
  var out = []
  switch (expr.x) {
    case 0: out.push('left'); break
    case 0.5: out.push('center'); break
    case 1: out.push('right'); break
    default: out.push(expr.x * 100 + '%')
  }

  switch (expr.y) {
    case 0: out.push('top'); break
    case 0.5: out.push('middle'); break
    case 1: out.push('bottom'); break
    default: out.push((expr.y * 100) + '%')
  }

  return out.join(' ')
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
