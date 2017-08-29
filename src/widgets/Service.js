const blessed = require('blessed')

function Service ({ data }) {
  const box = blessed.box({
    top: 'center',
    left: 'center',
    width: '50%',
    height: '50%',
    border: {
      type: 'line'
    },
    tags: true
  })

  box.setContent(`{center}{bold}${data.name}{/bold}{/center}`)
  box.setLine(1, `{bold}ID:{/bold} ${data.id}`)
  box.setLine(2, `{bold}Health State:{/bold} ${data.healthState}`)
  box.setLine(2, `{bold}Scale:{/bold} ${data.currentScale}`)
  box.setLine(3, `{bold}Image:{/bold} ${data.launchConfig.imageUuid.substring(7)}`)

  return box
}

module.exports = Service
