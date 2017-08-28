const blessed = require('blessed')

function Screen () {
  const screen = blessed.screen({
    smartCSR: true
  })

  screen.title = 'Rancher'

  screen.key(['escape', 'q', 'C-c'], () => process.exit(0))

  return screen
}

module.exports = Screen()
