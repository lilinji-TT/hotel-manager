import { ManageHeadCell } from '../../domin/Headline'
import TableList from '../common/tableList/tableList'
import { Manage } from '../../domin/Record'
import { RecordRows as rows } from '../../mock/tableDate'
import { useMemo, useState } from 'react'
import { IconButton, Stack, Tooltip } from '@mui/material'
import EditCalendarIcon from '@mui/icons-material/EditCalendar'
import DeleteIcon from '@mui/icons-material/Delete'
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
	const [selected, setSelected] = useState<string[]>([])
	const handleSelectChange = (selectValue: string[]) => {
		setSelected(selectValue)
	}

	const [search, setSearch] = useState<string>('')
	const handleSearchChange = (search: string) => {
		setSearch(search)
	}
	const [open, setOpen] = useState(false)

	const handleClickOpen = () => {
		setOpen(true)
	}
	const handleClose = () => {
		setOpen(false)
	}

	const selectedItem = useMemo(() => {
		return rows.filter((item) => item._id === selected[0])
	}, [selected])

	return (
		<TableList<Manage>
			title='入住管理'
			headCells={headCells}
			rows={rows}
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
							<ManageTableEditList open={open} handleClose={handleClose} selectedItem={selectedItem[0]} />
						</>
					)}

					<Tooltip title='删除'>
						<IconButton>
							<DeleteIcon />
						</IconButton>
					</Tooltip>
				</Stack>
			)}
		</TableList>
	)
}

export default ManagePage
