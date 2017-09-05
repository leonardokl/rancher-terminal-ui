const api = require('./api')

class Service {
  findProjects () {
    return api.get('/projects')
  }

  findProjectStacks (projectID) {
    return api.get(`/projects/${projectID}/stacks`)
  }

  findProjectStackServices (projectID, stackID) {
    return api.get(`/projects/${projectID}/stacks/${stackID}/services`)
  }

  getProjectServiceByID (projectID, serviceID) {
    return api.get(`/projects/${projectID}/services/${serviceID}`)
  }
}

module.exports = new Service()
