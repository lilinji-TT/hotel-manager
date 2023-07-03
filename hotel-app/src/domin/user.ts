import { Entity } from './Entity'

export enum Role {
	ADMIN = 'ADMIN',
	REGULAR = 'REGULAR'
}

export interface User extends Entity {
	userName: string
	realName: string
	password?: string
	role: Role
	isActive: boolean
	activationCode: string
}

export type UserState = Pick<User, 'userName' | 'realName' | 'role' | '_id'>

export type BaseUser = UserState

export interface UserStateWithAuth extends UserState {
	isAuthenticated: boolean
}
