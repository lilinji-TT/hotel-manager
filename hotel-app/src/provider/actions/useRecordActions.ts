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
		const tempRecords = recordActions.deleteSingleRecord(state, action)
		const record_state = {
			records: tempRecords,
			historyRecords: [action.payload, ...state.historyRecords]
		}
		ss.set('RECORD_STATE', record_state)
		return record_state
	},
	deleteSingleRecord: (state, action) => {
		const newRecords = state.records.slice()
		const index = newRecords.findIndex((record) => record._id === action.payload._id)
		newRecords.splice(index, 1)
		return newRecords
	}
}
