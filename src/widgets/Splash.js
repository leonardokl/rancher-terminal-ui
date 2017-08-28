const blessed = require('blessed')

const Splash = () => blessed.box({
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  border: {
    type: 'line'
  },
  tags: true
})

module.exports = Splash
