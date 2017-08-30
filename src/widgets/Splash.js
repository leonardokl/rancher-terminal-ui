const blessed = require('blessed')

const Splash = () => blessed.box({
  right: 0,
  width: '80%',
  height: '100%',
  border: {
    type: 'line',
    fg: '#0075a8'
  },
  tags: true
})

module.exports = Splash
