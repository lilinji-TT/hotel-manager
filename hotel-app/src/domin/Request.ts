import { Record } from './Record'
import { Room, RoomType } from './Room'
import { User } from './User'
// 身份验证请求
export type userLogin = Pick<User, 'userName' | 'password'>
export type userRegister = Pick<User, 'userName' | 'password' | 'activationCode'>
export interface userReset extends Pick<User, 'userName' | 'activationCode'> {
	oldPassword: string
	newPassword: string
}
// 员工管理请求
export type userRealName = Pick<User, 'realName'>

// 房间管理请求

export type roomBaseDetail = Omit<Room, '_id' | 'status'>
export type roomNumber = Pick<Room, 'number'>
export type roomBaseDetailWithoutType =
	| Omit<roomBaseDetail, 'type'>
	| {
			rooms: Omit<roomBaseDetail, 'type'>[]
	  }

export interface newRoom {
	newType: RoomType
	newNumber: number
	newPrice: number
}

// 定房记录请求

export type recordStatus = Pick<Record, 'status'>

export type recordWithoutId = Omit<Record, '_id'>

export type recordUpdate = Pick<Record, 'status' | 'checkOutDate' | 'fee'>
