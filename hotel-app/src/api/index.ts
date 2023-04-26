import { get, post, del } from '../utils/request'
import * as request from '../domin/Request'
import { Entity } from '../domin/Entity'

export const login = (data: request.userLogin) => {
	return post('/user/login', data)
}

export const register = (data: request.userRegister) => {
	return post('/user/register', data)
}

export const resetPassword = (data: request.userReset) => {
	return post('/user/reset', data)
}

export const getRegularUserList = () => {
	return get('/user/list')
}

export const addRegularUser = (data: request.userRealName) => {
	return post('/user/add', data)
}

export const removeRegularUser = (params: request.userRealName) => {
	return get('/user/delete', params)
}

export const getRoomList = () => {
	return get('/room/list')
}

export const addNewRoom = (data: request.roomBaseDetail) => {
	return post('/room/add', data)
}

export const removeRooms = (data: request.roomBaseDetailWithoutType) => {
	return del('/room/delete', data)
}

export const updateRoom = (data: request.newRoom, params: request.roomNumber) => {
	return post('/room/update', data, params)
}

export const getRecordListByStatus = (params: request.recordStatus) => {
	return get('/record/list', params)
}

export const addNewRecord = (data: request.recordWithoutId) => {
	return post('/record/add', data)
}

export const updateNewRecord = (data: request.recordUpdate, params: Entity) => {
	return post('/record/update', data, params)
}
