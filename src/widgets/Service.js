const blessed = require('blessed')

function Service ({ data }) {
  const content = [
    `{center}{bold}${data.name}{/bold}{/center}`,
    `{bold}ID:{/bold} ${data.id}`,
    `{bold}Scale:{/bold} ${data.currentScale}`,
    `{bold}Image:{/bold} ${data.launchConfig.imageUuid.substring(7)}`
  ].join('\n')
  const box = blessed.box({
    content,
    top: 'center',
    left: 'center',
    width: '50%',
    height: '50%',
    border: {
      type: 'line'
    },
    tags: true
  })

  box.focus()

  return box
}

module.exports = Service
