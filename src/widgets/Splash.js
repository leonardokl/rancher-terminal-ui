const blessed = require('blessed')
const config = require('../config')

const Splash = () => blessed.box({
  right: 0,
  width: '80%',
  height: '100%',
  border: {
    type: 'line',
    fg: config.primaryColor
  },
  tags: true
})

module.exports = Splash
