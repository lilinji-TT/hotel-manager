import axios from 'axios'

const request = axios.create({
	baseURL: 'https://example.com/api',
	timeout: 5000,
	headers: { 'Content-Type': 'application/json' }
})

// 添加请求拦截器
request.interceptors.request.use(
	(config) => {
		// 在发送请求之前做些什么
		// 添加请求头
		return config
	},
	(error) => {
		// 对请求错误做些什么
		return Promise.reject(error)
	}
)

// 添加响应拦截器
request.interceptors.response.use(
	(response) => {
		// 对响应数据做点什么
		return response
	},
	(error) => {
		return Promise.reject(error)
	}
)

export default request
