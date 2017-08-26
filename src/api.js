const Axios = require('axios')
const debug = require('debug')('api')

const { RANCHER_URL, RANCHER_ACCESS_KEY, RANCHER_SECRET_KEY } = process.env

const auth = {
  username: RANCHER_ACCESS_KEY,
  password: RANCHER_SECRET_KEY
}

const axios = Axios.create({
  auth,
  withCredentials: true,
  baseURL: `${RANCHER_URL}/v2-beta/`
})

axios.interceptors.request.use(
  config => {
    debug(config.method, config.url)

    return config
  },
  error => Promise.reject(error)
)

module.exports = axios
