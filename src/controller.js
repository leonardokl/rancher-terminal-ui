const R = require('ramda')
const debug = require('debug')('controller')
const service = require('./service')

const PROJECT_ATTRIBUTES = ['id', 'name', 'healthState']
const STACK_ATTRIBUTES = ['id', 'name', 'description', 'serviceIds', 'healthState']

class Controller {
  showProjects () {
    debug('showProjects()')

    service.findProjects()
      .then(R.path(['data', 'data']))
      .then(R.map(R.pick(PROJECT_ATTRIBUTES)))
      .then(console.log)
      .catch(console.error)
  }

  showProject (projectID) {
    debug(`showProject(${projectID})`)

    service.getProjectByID(projectID)
      .then(R.prop('data'))
      .then(R.pick(PROJECT_ATTRIBUTES))
      .then(console.log)
      .catch(console.error)
  }

  showProjectStacks (projectID) {
    debug(`showProjectStacks(${projectID})`)

    service.findProjectStacks(projectID)
      .then(R.path(['data', 'data']))
      .then(R.map(R.pick(STACK_ATTRIBUTES)))
      .then(console.log)
      .catch(console.error)
  }

  showProjectStack (projectID, stackID) {
    debug(`showProjectStack(${projectID}, ${stackID})`)

    service.getProjectStackByID(projectID, stackID)
      .then(R.prop('data'))
      .then(R.pick(STACK_ATTRIBUTES))
      .then(console.log)
      .catch(console.error)
  }

  showProjectStackServices (projectID, stackID) {
    const attributes = ['id', 'name', 'state', 'healthState']

    debug(`showProjectStackServices(${projectID}, ${stackID})`)

    service.findProjectStackServices(projectID, stackID)
      .then(R.path(['data', 'data']))
      .then(R.map(R.pick(attributes)))
      .then(console.log)
      .catch(console.error)
  }

  showProjectService (projectID, serviceID) {
    const attributes = ['id', 'name', 'state', 'healthState']

    debug(`showProjectService(${projectID}, ${serviceID})`)

    service.getProjectServiceByID(projectID, serviceID)
      .then(R.prop('data'))
      .then(R.pick(attributes))
      .then(console.log)
      .catch(console.error)
  }
}

module.exports = new Controller()
