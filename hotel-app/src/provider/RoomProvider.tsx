import { ReactNode, createContext, useReducer } from 'react'
import { Room, RoomType, RoomStatus } from '../domin/Room.ts'
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
		case '':
			return
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
