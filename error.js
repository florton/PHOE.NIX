/*
 * Error module
 *
 *   var error = require('./error')
 *
 *   error('Something happened', {line: 7, col: 22})
 *   error('Something else happened', {line: 70, col: 1})
 *   error('That\'s strange')
 *   console.log(error.count)
 */

function error(message, location) {
  if (location && location.line_num) {
    message = message.concat(' at line ', location.line_num)
    if (location.line_pos) {
      message = message.concat(', column ', location.line_pos)
    }
  } else if (location && location.path) {
    message = message.concat(', found ', location.path)
  }

  if (!error.quiet) {
      return('Error: ' + message)
  }

  error.count++
}

error.quiet = false

error.count = 0

module.exports = error