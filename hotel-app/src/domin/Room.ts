import { Entity } from './Entity'

export enum RoomType {
	NONE = 'NONE',
	SINGLE = 'SINGLE_ROOM',
	DOUNLE = 'DOUBLE_ROOM',
	TWIN = 'TWIN_ROOM',
	DELUXE = 'DELUXE_ROOM'
}

export enum RoomStatus {
	AVAILABLE = 'AVAILABLE',
	OCCUPIED = 'OCCUPIED'
}

export interface Room extends Entity {
	type: RoomType
	number: string
	price: number
	status: RoomStatus
}
