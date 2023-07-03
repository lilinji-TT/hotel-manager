import { Manage, Record } from './Record'
import { Room } from './Room'
import { User } from './User'

export interface BaseHeadCell {
	disablePadding: boolean
	label: string
	numeric: boolean
}

export interface RecordHeadCell extends BaseHeadCell {
	id: keyof Record
}

export interface RoomHeadCell extends BaseHeadCell {
	id: keyof Room
}

export interface UserHeadCell extends BaseHeadCell {
	id: keyof User
}

export interface ManageHeadCell extends BaseHeadCell {
	id: keyof Manage
}

export type HeadCell = RecordHeadCell | RoomHeadCell | UserHeadCell | ManageHeadCell
