require('dotenv').config()

const R = require('ramda')
const debug = require('debug')('index')
const blessed = require('blessed')
const service = require('./service')
const screen = require('./widgets/screen')
const Splash = require('./widgets/Splash')
const List = require('./widgets/List')
const Service = require('./widgets/Service')
const store = {
  projectID: null,
  stackID: null,
  serviceID: null,
  projects: [],
  stacks: {},
  services: {}
}

screen.title = 'Rancher'

const splash = Splash()
var title = blessed.box({
  parent: screen,
  padding: 1,
  content: '{bold}Rancher CLI{/bold}',
  width: '20%',
  height: '100%',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    border: {
      fg: '#0075a8'
    }
  }
})

screen.render()

function addLoader () {
  splash.setContent('{center}Loading...{/center}')
  screen.append(splash)
  screen.render()
}

function removeLoader () {
  splash.destroy()
  screen.render()
}

function handleError (err) {
  splash.setContent(`{center}Error: ${err.message}{/center}`)
}

function initServiceScreen () {
  addLoader()

  service.getProjectServiceByID(store.projectID, store.serviceID)
    .then(({ data }) => {
      const el = Service({ data })

      screen.title = `${store.serviceID} - Services - Rancher`

      screen.append(el)
      screen.render()

      el.key(['backspace'], () => {
        el.destroy()
        renderServices()
      })
    })
    .catch(handleError)
    .then(removeLoader)
    .then(() => screen.render())
}

function renderServices () {
  const onSelect = (el, data) => {
    store.serviceID = data.id

    el.destroy()
    initServiceScreen()
  }
  const { projectID, stackID } = store
  const nameSpace = `${projectID}/${stackID}`
  const list = List({ label: 'Services', data: store.services[nameSpace], onSelect })
  const listBar = blessed.listbar({
    bottom: 0,
    left: 'center',
    width: '50%',
    height: 10,
    tags: true,
    keys: true,
    autoCommandKeys: true,
    items: ['Quick upgrade'],
    commands: {
      'Quick upgrade': () => console.log('Upgrading')
    }
  })

  screen.title = 'Services - Rancher'
  screen.append(listBar)
  screen.append(list)
  screen.render()

  list.key(['backspace'], () => {
    list.destroy()
    renderStacks()
  })
}

function initServicesScreen () {
  const { projectID, stackID } = store
  const nameSpace = `${projectID}/${stackID}`

  addLoader()

  if (store.services[nameSpace]) {
    renderServices()
    removeLoader()
  } else {
    service.findProjectStackServices(projectID, stackID)
      .then(R.path(['data', 'data']))
      .then(data => { store.services[nameSpace] = data })
      .then(renderServices)
      .catch(handleError)
      .then(removeLoader)
      .then(() => screen.render())
  }
}

function renderStacks () {
  const onSelect = (el, data) => {
    store.stackID = data.id

    el.destroy()
    initServicesScreen()
  }

  const list = List({ label: 'Stacks', data: store.stacks[store.projectID], onSelect })

  screen.title = 'Stacks - Rancher'
  screen.append(list)

  list.key(['backspace'], () => {
    list.destroy()
    renderProjects()
  })

  screen.render()
}

function initStacksScreen () {
  addLoader()

  if (store.stacks[store.projectID]) {
    removeLoader()
    renderStacks()
  } else {
    service.findProjectStacks(store.projectID)
      .then(R.path(['data', 'data']))
      .then(data => { store.stacks[store.projectID] = data })
      .then(renderStacks)
      .catch(handleError)
      .then(removeLoader)
      .then(() => screen.render())
  }
}

function renderProjects () {
  const onSelect = (el, data) => {
    store.projectID = data.id

    el.destroy()
    initStacksScreen()
  }
  const list = List({ label: 'Environments', data: store.projects, onSelect })

  screen.title = 'Environments - Rancher'
  screen.append(list)
  screen.render()
}

function initProjectsScreen () {
  addLoader()

  service.findProjects()
    .then(R.path(['data', 'data']))
    .then(data => { store.projects = data })
    .then(renderProjects)
    .catch(handleError)
    .then(removeLoader)
    .then(() => screen.render())
}

initProjectsScreen()
