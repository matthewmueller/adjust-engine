/**
 * Export `mirror`
 */

module.exports = mirror

/**
 * Get the mirror of the attachment
 *
 * @param {Number|Object}
 * @return {Object}
 */

function mirror (p) {
  if (typeof p === 'number') {
    return round(Math.abs(1 - p))
  }

  return {
    x: round(Math.abs(1 - p.x)),
    y: round(Math.abs(1 - p.y))
  }
}

/**
 * Rounding
 *
 * @param {Number} n
 * @return {Number}
 */

function round (n) {
  return parseFloat(n.toFixed(2))
}
