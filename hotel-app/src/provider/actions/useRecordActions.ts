import { ss } from '../../utils/storage'

export const recordActions = {
	addRecord: (state, action) => {
		const record_state = {
			...state,
			records: [action.payload, ...state.records]
		}
		ss.set('RECORD_STATE', record_state)
		return record_state
	},
	addHistoryRecord: (state, action) => {
		const tempRecords = state.records.slice()
		const index = tempRecords.findIndex((record) => record._id === action.payload._id)
		tempRecords.splice(index, 1)
		const record_state = {
			records: tempRecords,
			historyRecords: [action.payload, ...state.historyRecords]
		}
		ss.set('RECORD_STATE', record_state)
		return record_state
	}
}
