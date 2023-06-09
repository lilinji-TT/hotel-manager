import { del, get, patch, post } from '../utils/request'

// 获取员工列表
export const getGroupList = () => {
	return get('/group/list/')
}

// 新增员工
export const addGroup = (realName) => {
	return post('/group/add/', { realName })
}

// 删除员工
export const deleteGroup = (_id) => {
	return del(`/group/delete/${_id}/`)
}

// 修改员工
export const updateGroup = (_id, newRealName) => {
	return patch(`/group/update/${_id}/`, { newRealName })
}

// 获取房间列表
export const getRoomList = async () => {
	return get('/room/list/')
}

// 新增房间
export const addRoom = (type: string, number, price) => {
	return post('/room/add/', { type, number, price })
}

// 删除房间
export const deleteRoom = (id) => {
	return del(`/room/delete/${id}/`)
}

// 修改房间
export const updateRoom = (id, newType, newNumber, newPrice) => {
	return patch(`/room/update/${id}/`, { newType, newNumber, newPrice })
}

// 员工注册
export const registerMember = (userName, passWord, activationCode) => {
	return post('/member/register/', { userName, passWord, activationCode })
}

// 登录模块
export const login = (userName, passWord) => {
	return post('/public/login/', { userName, passWord })
}

// 忘记密码
export const forgetPassword = (userName, activationCode, newPassword) => {
	return post('/public/forget/', { userName, activationCode, newPassword })
}

// 修改密码
export const updatePassword = (userName, activationCode, newPassword, oldPassword) => {
	return post('/public/update/', { userName, activationCode, newPassword, oldPassword })
}

// 获取历史订单
export const getHistoryOrders = () => {
	return get('/public/list/')
}

// 获取进行中订单
export const getOngoingOrders = () => {
	return get('/order/on_list/')
}

// 新增订单
export const addOrder = (roomId, type, number, customName, idCard, phone, handlerName) => {
	return post('/order/add/', { roomId, type, number, customName, idCard, phone, handlerName })
}

// 计算费用
export const calculateOrderFee = (_id) => {
	return post('/order/cal/', { _id })
}

// 结束订单
export const finishOrder = (id, roomId, fee) => {
	return patch(`/order/finish/${id}/`, { roomId, fee })
}
