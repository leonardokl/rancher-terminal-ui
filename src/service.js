// const debug = require('debug')('service')
const api = require('./api')

class Service {
  findProjects () {
    return api.get('/projects')
  }

  getProjectByID (projectID) {
    return api.get(`/projects/${projectID}`)
  }

  findProjectStacks (projectID) {
    return api.get(`/projects/${projectID}/stacks`)
  }

  getProjectStackByID (projectID, stackID) {
    return api.get(`/projects/${projectID}/stacks/${stackID}`)
  }

  findProjectStackServices (projectID, stackID) {
    return api.get(`/projects/${projectID}/stacks/${stackID}/services`)
  }

  getProjectServiceByID (projectID, serviceID) {
    return api.get(`/projects/${projectID}/services/${serviceID}`)
  }
}

module.exports = new Service()
