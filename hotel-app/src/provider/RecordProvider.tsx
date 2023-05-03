import { ReactNode, createContext, useReducer } from 'react'
import { Record } from '../domin/Record.ts'
import { ss } from '../utils/storage/local.ts'
import { recordActions } from './actions/useRecordActions.ts'

export interface RECORD_STATE {
	recordState: Record[]

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	recordDispatch: React.Dispatch<{ type: string; payload: any }>
}
const defaultRecordState: Record[] = ss.get('RECORD_STATE') || []

const recordReducer = (state = defaultRecordState, action) => {
	switch (action.type) {
		case 'GET_RECORD_STATE':
			return ss.get('RECORD_STATE')
		case 'SET_RECORD_STATE':
			return recordActions.addRecord(state, action)
		default:
			return state
	}
}

export const RecordContext = createContext<RECORD_STATE>({} as RECORD_STATE)

const RecordProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {
	const [recordState, recordDispatch] = useReducer(recordReducer, defaultRecordState)
	return <RecordContext.Provider value={{ recordState, recordDispatch }}>{children}</RecordContext.Provider>
}

export default RecordProvider
