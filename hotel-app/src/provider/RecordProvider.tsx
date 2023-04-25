import { ReactNode, createContext, useReducer } from 'react'
import { Record, RecordStatus } from '../domin/Record.ts'
import { RoomType } from '../domin/Room.ts'

export interface RECORD_STATE {
	recordState: Record[]

	recordDispatch: React.Dispatch<{ type: string } | Record>
}
const defaultRecordState: Record[] = [
	{
		_id: '',
		roomId: '',
		type: RoomType.NONE,
		number: '',
		customName: '',
		idCard: '',
		phone: '188678467314',
		checkInDate: new Date(''),
		checkOutDate: new Date(''),
		fee: 0,
		status: RecordStatus.COMPLETED,
		handlerName: ''
	}
]

const recordReducer = (state = defaultRecordState, action) => {
	switch (action.type) {
		case '':
			return state
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
