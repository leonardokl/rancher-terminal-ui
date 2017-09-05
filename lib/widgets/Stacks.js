const R = require('ramda')
const blessed = require('blessed')
const config = require('../config')

const styles = {
  list: {
    border: {
      fg: config.primaryColor
    },
    selected: {
      bg: 'red',
      bold: true
    },
    header: {
      bold: true
    },
    cell: {
      fg: 'magenta',
      selected: {
        bg: config.primaryColor,
        bold: true
      },
      hover: {
        bg: config.primaryColor
      }
    }
  }
}

function Stacks ({ label, data = [], onSelect = () => 1 }) {
  const items = data.map(i => [i.name, i.healthState])
  const rows = R.prepend(['Name', 'Health'], items)
  const box = blessed.box({
    right: 0,
    label: 'Stacks',
    width: '80%',
    height: '100%',
    border: {
      type: 'line',
      fg: '#0075a8'
    }
  })
  const list = blessed.listtable({
    parent: box,
    data: [],
    right: 0,
    padding: 1,
    tags: true,
    mouse: true,
    keys: true,
    width: '100%-2',
    vi: true,
    align: 'left',
    style: styles.list
  })
  list.setData(rows)
  list.focus()

  box.focus = () => list.focus()

  list.on('select', (_, index) => {
    const environment = data[index - 1]

    onSelect(list, environment)
  })

  return box
}

module.exports = Stacks
