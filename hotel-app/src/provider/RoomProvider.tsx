import { ReactNode, createContext, useReducer } from 'react'
import { Room } from '../domin/Room.ts'
import { ss } from '../utils/storage/index.ts'
import { roomActions } from './actions/useRoomActions.ts'

export interface ROOM_STATE {
	roomState: Room[]

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	roomDispatch: React.Dispatch<{ type: string; payload: any }>
}
const defaultRoomState: Room[] = ss.get('ROOM_STATE') ?? []

const roomReducer = (state = defaultRoomState, action) => {
	switch (action.type) {
		case 'GET_ROOM_STATE':
			return ss.get('ROOM_STATE') ?? []
		case 'SET_ROOM_STATE':
			return roomActions.setRoomState(state, action)
		case 'SET_ROOM_LIST':
			return roomActions.setRoomList(state, action)
		case 'ADD_SINGLE_ROOM':
			return roomActions.addRoom(state, action)
		case 'DELETE_SINGLE_ROOM':
			return roomActions.deleteRoom(state, action)
		case 'UPDATE_ROOM_STATE':
			return roomActions.updateRoom(state, action)
		default:
			return state
	}
}

export const RoomContext = createContext<ROOM_STATE>({} as ROOM_STATE)

const RoomProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {
	const [roomState, roomDispatch] = useReducer(roomReducer, defaultRoomState)
	return <RoomContext.Provider value={{ roomState, roomDispatch }}>{children}</RoomContext.Provider>
}

export default RoomProvider
