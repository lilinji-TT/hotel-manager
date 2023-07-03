import { Id } from '../domin/Entity'
import { Room, RoomStatus, RoomType } from '../domin/Room'
import { RecordStatus, Record } from '../domin/Record'
import { User, Role } from '../domin/User'
const createRecordData = (
	_id: Id,
	number: string,
	roomId: Id,
	customName: string,
	idCard: string,
	type: RoomType,
	phone: string,
	checkInDate: Date,
	checkOutDate: Date,
	fee: number,
	status: RecordStatus,
	handlerName: string
): Record => {
	return {
		_id,
		number,
		roomId,
		customName,
		idCard,
		type,
		phone,
		checkInDate,
		checkOutDate,
		fee,
		status,
		handlerName
	}
}

const createRoomData = (_id: Id, number: string, type: RoomType, price: number, status: RoomStatus): Room => {
	return {
		_id,
		number,
		type,
		price,
		status
	}
}

const createUserData = (
	_id: Id,
	userName: string,
	realName: string,
	role: Role,
	isActive: boolean,
	activationCode: string
): User => {
	return {
		_id,
		userName,
		realName,
		role,
		isActive,
		activationCode
	}
}

const RoomRows = [
	createRoomData('1', '103', RoomType.SINGLE, 100, RoomStatus.AVAILABLE),
	createRoomData('2', '104', RoomType.DOUNLE, 200, RoomStatus.OCCUPIED)
]

const UserRows = [
	createUserData('1', 'user11', '小明', Role.ADMIN, true, 'asdasdas'),
	createUserData('2', 'user12', '小红', Role.REGULAR, true, 'asdaasdadas')
]

const RecordRows = [
	createRecordData(
		'1',
		'101',
		'1211',
		'aaa',
		'11111',
		RoomType.DOUNLE,
		'121212',
		new Date(),
		new Date(),
		11,
		RecordStatus.COMPLETED,
		'aa'
	),
	createRecordData(
		'2',
		'102',
		'1111',
		'ab',
		'11111',
		RoomType.DOUNLE,
		'121212',
		new Date(),
		new Date(),
		11,
		RecordStatus.COMPLETED,
		'aa'
	)
]

export { RecordRows, RoomRows, UserRows }
