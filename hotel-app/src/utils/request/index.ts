import type { AxiosResponse } from 'axios'
import request from './axios'

export interface HttpOption {
	url: string
	data?: unknown
	method?: string
	headers?: unknown
}

export interface Response<T = unknown> {
	data: T
	message: string | null
	status: string
	response: {
		data: {
			status: string
			message: string | null
		}
	}
}

function http<T = unknown>({ url, data, method }: HttpOption) {
	const successHandler = (res: AxiosResponse<Response<T>>) => {
		if (res.data?.status === 'Success') return res.data
		return Promise.reject(res.data)
	}

	const failHandler = (error: Response<Error>) => {
		throw new Error(error.response?.data.message || '对不起，出现了一点小错误~')
	}

	method = method || 'GET'

	const params = Object.assign(typeof data === 'function' ? data() : data ?? {}, {})

	return method === 'GET'
		? request.get(url, { params }).then(successHandler, failHandler)
		: request.post(url, params).then(successHandler, failHandler)
}

export function get<T = unknown>({ url, data, method = 'GET' }: HttpOption): Promise<Response<T>> {
	return http<T>({
		url,
		method,
		data
	})
}

export function post<T = unknown>({ url, data, method = 'POST', headers }: HttpOption): Promise<Response<T>> {
	return http<T>({
		url,
		method,
		data,
		headers
	})
}

export default post
