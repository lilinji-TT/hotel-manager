import { Entity, Id } from './Entity'
import { Room } from './Room'

export enum RecordStatus {
	PROCESSING = 'PROCESSING',
	COMPLETED = 'COMPLETED'
}

export interface record extends Omit<Room, '_id' | 'status' | 'price'>, Entity {
	roomId: Id
	customName: string
	idCard: string
	phone: string
	checkInDate: Date
	checkOutDate: Date
	fee: number
	status: RecordStatus
	handlerName: string
}
