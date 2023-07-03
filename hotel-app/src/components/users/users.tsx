import { UserHeadCell } from '../../domin/Headline'
import TableList from '../common/tableList/tableList'
import { UserRows as rows } from '../../mock/tableDate'
import { useMemo, useState } from 'react'
import { User } from '../../domin/User'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { IconButton, Stack, Tooltip } from '@mui/material'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import DeleteIcon from '@mui/icons-material/Delete'
import UsersTableEditList from './usersTableEditList'
const headCells: UserHeadCell[] = [
	{
		id: 'userName',
		numeric: false,
		disablePadding: true,
		label: '账号'
	},
	{
		id: 'realName',
		numeric: true,
		disablePadding: false,
		label: '姓名'
	},
	{
		id: 'role',
		numeric: true,
		disablePadding: false,
		label: '身份'
	},
	{
		id: 'isActive',
		numeric: true,
		disablePadding: false,
		label: '状态'
	},
	{
		id: 'activationCode',
		numeric: true,
		disablePadding: false,
		label: '验证码'
	}
]
const RecordPage: React.FC = () => {
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
		<TableList<User>
			title='员工列表'
			headCells={headCells}
			rows={rows}
			selectBox={true}
			selected={selected}
			search={search}
			handleSelectChange={handleSelectChange}
			handleSearchChange={handleSearchChange}
		>
			<UsersTableEditList open={open} handleClose={handleClose} selectedItem={selectedItem[0]} />
			{selected.length === 0 && (
				<Tooltip title='添加'>
					<IconButton onClick={() => handleClickOpen()}>
						<PersonAddAltIcon />
					</IconButton>
				</Tooltip>
			)}

			{selected.length > 0 && (
				<Stack spacing={1} direction='row'>
					{selected.length === 1 && (
						<Tooltip title='修改'>
							<IconButton onClick={() => handleClickOpen()}>
								<ModeEditIcon />
							</IconButton>
						</Tooltip>
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

export default RecordPage
