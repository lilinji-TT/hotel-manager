import request from './axios'

// 封装get请求
export const get = (url, params = {}) => {
	return request.get(url, {
		params
	})
}

// 封装post请求
export const post = (url, data = {}) => {
	return request.post(url, data)
}

// 封装delete请求
export const del = (url, params = {}) => {
	return request.delete(url, {
		params
	})
}
