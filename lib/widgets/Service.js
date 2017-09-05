const blessed = require('blessed')

function Service ({ data }) {
  const content = [
    `{bold}ID:{/bold} ${data.id}`,
    `{bold}Scale:{/bold} ${data.currentScale}`,
    `{bold}Image:{/bold} ${data.launchConfig.imageUuid.substring(7)}`
  ].join('\n')
  const box = blessed.box({
    content,
    label: `Service: {bold}${data.name}{/bold}`,
    padding: 1,
    right: 0,
    width: '80%',
    height: '100%',
    border: {
      type: 'line',
      fg: '#0075a8'
    },
    tags: true
  })

  box.focus()

  return box
}

module.exports = Service
