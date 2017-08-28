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

function List ({ data = [], onSelect = () => 1 }) {
  const items = data.map(R.prop('name'))
  const list = blessed.list({
    items,
    top: 'center',
    left: 'center',
    width: '50%',
    height: '50%',
    tags: true,
    mouse: true,
    keys: true,
    vi: true,
    border: {
      type: 'line'
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
