import { ss } from '../../utils/storage'
export const roomActions = {
	setRoomState: (state, action) => {
		const room_state = state.map((room) => {
			if (room._id === action.payload._id) {
				return action.payload
			}
			return room
		})
		ss.set('ROOM_STATE', room_state)
		return room_state
	},
	addRoom: (state, action) => {
		const room_state = [...state, action.payload]
		ss.set('ROOM_STATE', room_state)
		return room_state
	},
	updateRoom: (state, action) => {
		const room_state = state.map((room) => {
			if (room.number === action.payload) {
				return {
					...room,
					status: 'AVAILABLE'
				}
			}
			return room
		})
		ss.set('ROOM_STATE', room_state)
		return room_state
	},
	deleteRoom: (state, action) => {
		const room_state = state.slice()
		const index = room_state.findIndex((room) => room._id === action.payload)
		room_state.splice(index, 1)
		ss.set('ROOM_STATE', room_state)
		return room_state
	},
	setRoomList: (_state, action) => {
		return action.payload
	}
}
