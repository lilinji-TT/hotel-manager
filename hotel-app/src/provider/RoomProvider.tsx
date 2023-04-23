import { ReactNode, createContext, useReducer } from 'react'
import { Room, RoomStatus, RoomType } from '../domin/Room.ts'
import { ss } from '../utils/storage/index.ts'
const defaultRoomState: Room[] = [
	{
		_id: '',
		type: RoomType.NONE,
		number: '',
		price: 0,
		status: RoomStatus.OCCUPIED
	}
]

const roomReducer = (state = defaultRoomState, action) => {
	switch (action.type) {
		case 'GET_ROOM_STATE':
			return ss.get('ROOM_STATE')
		case 'SET_ROOM_STATE':
			return ss.set('ROOM_STATE', state)
		default:
			return state
	}
}

export const RoomContext = createContext({})

const RoomProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {
	const [roomState, roomDispatch] = useReducer(roomReducer, defaultRoomState)
	return <RoomContext.Provider value={{ roomState, roomDispatch }}>{children}</RoomContext.Provider>
}

export default RoomProvider
