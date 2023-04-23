import { post } from '../utils/request'

export const login = (params: { userName: string; passWord: string }) => {
	return post({ url: 'user/login', data: { id: params.userName, password: params.passWord } })
}
