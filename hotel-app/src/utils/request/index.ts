import request from './axios'

// 封装get请求
export const get = (url: string, params = {}) => {
	return request.get(url, {
		params
	})
}

// 封装post请求
export const post = (url: string, data = {}, params = {}) => {
	return request.post(url, data, { params })
}

// 封装delete请求
export const del = (url: string, params = {}) => {
	return request.delete(url, {
		params
	})
}
