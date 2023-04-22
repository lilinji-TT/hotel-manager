import { Entity } from './Entity'

export const userProjection = { passwordHash: 0 }

export enum Role {
	ADMIN = 'ADMIN',
	REGULAR = 'REGULAR'
}

export interface User extends Entity {
	userName: string
	realName: string
	role: Role
}

export interface UserWithAuth extends User {
	isAuthenticated: boolean
}
