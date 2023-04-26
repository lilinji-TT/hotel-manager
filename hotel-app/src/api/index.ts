import { post } from '../utils/request'

export const login = (params: { userName: string; password: string }) => {
	return post({ url: 'user/login', data: params })
}
