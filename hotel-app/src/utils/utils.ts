import { RecordStatus } from '../domin/Record'
import { RoomStatus, RoomType } from '../domin/Room'
import { Role } from '../domin/User'
export const isRoles = (role: Role, lookup: Role) => {
	return role === lookup
}

export const RecordFormat = (status: string) => {
	switch (status) {
		case RecordStatus.COMPLETED:
			return '完成'
		case RecordStatus.PROCESSING:
			return '进行中'
	}
}

export const RoleFormat = (role: string) => {
	switch (role) {
		case Role.ADMIN:
			return '管理员'
		case Role.REGULAR:
			return '员工'
	}
}
export const RoomTypeFormat = (type: string) => {
	switch (type) {
		case RoomType.SINGLE:
			return '单人间'
		case RoomType.DOUNLE:
			return '双人间'
		case RoomType.DELUXE:
			return '豪华间'
		case RoomType.NONE:
			return '未定义'
	}
}

export const RoomStatusFormat = (status: string) => {
	switch (status) {
		case RoomStatus.AVAILABLE:
			return '空闲'
		case RoomStatus.OCCUPIED:
			return '租用中'
	}
}

export const statusFormat = (status: string) => {
	switch (status) {
		case 'FINISHED':
			return '完成'
		case RecordStatus.PROCESSING:
			return '进行中'
		case RoomStatus.AVAILABLE:
			return '空闲'
		case RoomStatus.OCCUPIED:
			return '租用中'
	}
}

export const UserStatusFormat = (isActive: boolean) => {
	return isActive ? '已激活' : '未激活'
}
