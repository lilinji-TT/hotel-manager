import { RecordHeadCell } from '../../domin/Headline'
import TableList from '../common/tableList/tableList'
import { Record } from '../../domin/Record'
import { RecordRows as rows } from '../../mock/tableDate'
import { useState } from 'react'
import { getHistoryOrders } from '../../api'

const headCells: RecordHeadCell[] = [
	{
		id: 'number',
		numeric: false,
		disablePadding: true,
		label: '房间号'
	},
	{
		id: 'type',
		numeric: true,
		disablePadding: false,
		label: '房间类型'
	},
	{
		id: 'customName',
		numeric: true,
		disablePadding: false,
		label: '姓名'
	},
	{
		id: 'idCard',
		numeric: true,
		disablePadding: false,
		label: '身份证号'
	},
	{
		id: 'phone',
		numeric: true,
		disablePadding: false,
		label: '电话'
	},
	{
		id: 'checkInDate',
		numeric: true,
		disablePadding: false,
		label: '入住时间'
	},
	{
		id: 'checkOutDate',
		numeric: true,
		disablePadding: false,
		label: '退房时间'
	},
	{
		id: 'status',
		numeric: true,
		disablePadding: false,
		label: '状态'
	},
	{
		id: 'fee',
		numeric: true,
		disablePadding: false,
		label: '总计'
	},
	{
		id: 'handlerName',
		numeric: true,
		disablePadding: false,
		label: '处理人'
	}
]
const RecordPage: React.FC = () => {
	const [selected, setSelected] = useState<string[]>([])
	const { recordState, recordDispatch } = useContext(RecordContext)
	const handleSelectChange = (selectValue: string[]) => {
		setSelected(selectValue)
	}

	const [search, setSearch] = useState<string>('')
	const handleSearchChange = (search: string) => {
		setSearch(search)
	}

	const fetchHistoryRecord = async () => {
		const {
			data: { data }
		} = await getHistoryOrders()

		recordDispatch({ type: 'SET_HISTORY_RECORD_LIST', payload: data })
	}
	useEffect(() => {
		fetchHistoryRecord()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<TableList<Record>
			title='订单记录'
			headCells={headCells}
			rows={rows}
			selectBox={false}
			selected={selected}
			search={search}
			handleSelectChange={handleSelectChange}
			handleSearchChange={handleSearchChange}
		/>
	)
}

export default RecordPage
