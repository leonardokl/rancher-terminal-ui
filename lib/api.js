const axios = require('axios')
const debug = require('debug')('api')

const { RANCHER_URL, RANCHER_ACCESS_KEY, RANCHER_SECRET_KEY } = process.env

const auth = {
  username: RANCHER_ACCESS_KEY,
  password: RANCHER_SECRET_KEY
}

const axiosInstance = axios.create({
  auth,
  withCredentials: true,
  baseURL: `${RANCHER_URL}/v2-beta/`
})

axiosInstance.interceptors.request.use(
  config => {
    debug(config.method, config.url)

    return config
  },
  error => Promise.reject(error)
)

module.exports = axiosInstance
