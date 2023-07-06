import EditCalendarIcon from '@mui/icons-material/EditCalendar'
import { IconButton, Stack, Tooltip } from '@mui/material'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { getOngoingOrders } from '../../api'
import { ManageHeadCell } from '../../domin/Headline'
import { Manage } from '../../domin/Record'
import { RecordContext } from '../../provider/RecordProvider'
import TableList from '../common/tableList/tableList'
import ManageTableEditList from './manageTableEditList'

const headCells: ManageHeadCell[] = [
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
		label: '客户姓名'
	},
	{
		id: 'idCard',
		numeric: true,
		disablePadding: false,
		label: '客户身份证号'
	},
	{
		id: 'phone',
		numeric: true,
		disablePadding: false,
		label: '客户电话'
	},
	{
		id: 'checkInDate',
		numeric: true,
		disablePadding: false,
		label: '入住时间'
	},
	{
		id: 'handlerName',
		numeric: true,
		disablePadding: false,
		label: '处理人'
	}
]

const ManagePage: React.FC = () => {
	const { recordState, recordDispatch } = useContext(RecordContext)

	const [selected, setSelected] = useState<string[]>([])
	const [search, setSearch] = useState<string>('')
	const [open, setOpen] = useState(false)

	const handleSelectChange = (selectValue: string[]) => {
		setSelected(selectValue)
	}

	const handleSearchChange = (search: string) => {
		setSearch(search)
	}

	const resetSeleted = () => {
		setSelected([])
	}

	const handleClickOpen = () => {
		setOpen(true)
	}
	const handleClose = () => {
		setOpen(false)
	}

	const selectedItem = useMemo(() => {
		return recordState.records.filter((item) => item._id === selected[0])
	}, [recordState.records, selected])

	const fetchRecordList = async () => {
		const {
			data: { data }
		} = await getOngoingOrders()
		recordDispatch({ type: 'SET_RECORD_LIST', payload: data })
	}

	useEffect(() => {
		fetchRecordList()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<TableList<Manage>
			title='入住管理'
			headCells={headCells}
			rows={recordState.records}
			selectBox={true}
			selected={selected}
			search={search}
			handleSelectChange={handleSelectChange}
			handleSearchChange={handleSearchChange}
		>
			{selected.length > 0 && (
				<Stack spacing={1} direction='row'>
					{selected.length === 1 && (
						<>
							<Tooltip title='编辑'>
								<IconButton>
									<EditCalendarIcon onClick={() => handleClickOpen()} />
								</IconButton>
							</Tooltip>
							<ManageTableEditList
								open={open}
								handleClose={handleClose}
								resetSeleted={resetSeleted}
								selectedItem={selectedItem[0]}
							/>
						</>
					)}
				</Stack>
			)}
		</TableList>
	)
}

export default ManagePage
