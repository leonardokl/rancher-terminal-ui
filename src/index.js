require('dotenv').config()

const R = require('ramda')
// const debug = require('debug')('index')
// const blessed = require('blessed')
const service = require('./service')
const screen = require('./widgets/screen')
const Splash = require('./widgets/Splash')
const List = require('./widgets/List')

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

function handleError () {
  splash.setContent('{center}Error{/center}')
}

function initServiceScreen () {
  addLoader()

  service.getProjectServiceByID(store.projectID, store.serviceID)
    .then(({ data }) => {
      splash.setContent(`{center}{bold}${data.name}{/bold}{/center}`)
      splash.setLine(1, `{bold}ID:{/bold} ${data.id}`)
      splash.setLine(2, `{bold}Health State:{/bold} ${data.healthState}`)
      splash.setLine(2, `{bold}Scale:{/bold} ${data.currentScale}`)
      splash.setLine(3, `{bold}Image:{/bold} ${data.launchConfig.imageUuid.substring(7)}`)

      splash.key(['backspace'], () => {
        splash.destroy()
        renderServices()
      })
    })
    .catch(() => splash.setContent('{center}Error{/center}'))
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
  const list = List({ data: store.services[nameSpace], onSelect })

  screen.title = 'Services - Rancher'
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

  const list = List({ data: store.stacks[store.projectID], onSelect })

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
  const list = List({ data: store.projects, onSelect })

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
