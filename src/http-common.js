import axios from 'axios'


const ajax = axios.create({
  baseURL: process.env.API_BASEURL,
  timeout: 30000
})

ajax.interceptors.request.use(
  (config) => {

    let token = null

    if (localStorage.getItem("FinancesAppByNTS") !== null) {
      let obj = JSON.parse(localStorage.getItem("FinancesAppByNTS"));
      token = obj.token
    }

    if (token) {
      config.headers['Authorization'] = `Bearer ${ token }`
    }

    return config
  },

)

export default ajax
