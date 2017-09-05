const R = require('ramda')
const blessed = require('blessed')
const config = require('../config')

const styles = {
  list: {
    fg: 'magenta',
    item: {
      hover: {
        bg: config.primaryColor
      }
    },
    selected: {
      bg: config.primaryColor,
      bold: true
    }
  }
}

function Environments ({ data = [], onSelect = () => 1 }) {
  const items = data.map(R.prop('name'))
  const list = blessed.list({
    items,
    padding: 1,
    width: '20%',
    height: '100%',
    tags: true,
    mouse: true,
    keys: true,
    vi: true,
    label: 'Environments',
    border: {
      type: 'line',
      fg: config.primaryColor
    },
    style: styles.list
  })

  list.focus()

  list.on('select', ({ content }) => {
    const environment = data.find(R.propEq('name', content))

    onSelect(list, environment)
  })

  return list
}

module.exports = Environments
