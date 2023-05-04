import { ss } from '../../utils/storage'

export const recordActions = {
	addRecord: (state, action) => {
		const record_state = [action.payload, ...state]
		ss.set('RECORD_STATE', record_state)
		return record_state
	}
}
