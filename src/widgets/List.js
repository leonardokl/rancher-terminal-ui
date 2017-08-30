const R = require('ramda')
const blessed = require('blessed')

const styles = {
  list: {
    item: {
      hover: {
        bg: 'red'
      }
    },
    selected: {
      bg: 'red',
      bold: true
    }
  }
}

function List ({ label, data = [], onSelect = () => 1 }) {
  const items = data.map(R.prop('name'))
  const list = blessed.list({
    items,
    right: 0,
    padding: 1,
    width: '80%',
    height: '100%',
    tags: true,
    mouse: true,
    keys: true,
    vi: true,
    label,
    border: {
      type: 'line',
      fg: '#0075a8'
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

module.exports = List
