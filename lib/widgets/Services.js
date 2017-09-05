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
  const items = data.map(i => [i.name, i.healthState, i.state])
  const rows = R.prepend(['Name', 'Health', 'State'], items)
  const container = blessed.box({
    right: 0,
    width: '80%',
    height: '100%',
  });
  const box = blessed.box({
    right: 0,
    label: 'Services',
    width: '100%',
    height: '90%',
    border: {
      type: 'line',
      fg: '#0075a8'
    },
  })
  const list = blessed.listtable({
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
  const listBarContainer = blessed.listbar({
    bottom: 0,
    right: 0,
    label: 'Actions',
    width: '100%',
    height: '10%',
    border: {
      type: 'line',
      fg: '#0075a8'
    },
  })
  const listBar = blessed.listbar({
    tags: true,
    keys: true,
    autoCommandKeys: true,
    top: 'center',
    commands: {
      'Restart': () => console.log('Restarting'),
      'Quick upgrade': () => console.log('Upgrading'),
      'Finish Upgrade': () => console.log('Finish Upgrade')
    }
  })
  listBarContainer.append(listBar)
  container.append(box)
  container.append(listBarContainer)

  list.setData(rows)
  list.focus()

  box.append(list)
  container.listFocus = () => list.focus()
  container.listKey = (key, cb) => list.key(key, cb)

  list.on('select', (_, index) => {
    const environment = data[index - 1]

    onSelect(container, environment)
  })

  return container
}

module.exports = Stacks
