import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { IconButton, Stack, Tooltip } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { addGroup, deleteGroup, getGroupList, updateGroup } from '../../api'
import { UserHeadCell } from '../../domin/Headline'
import { User } from '../../domin/User'
import TableList from '../common/tableList/tableList'
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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [userList, setUserList] = useState<any[]>([])
	const handleSelectChange = (selectValue: string[]) => {
		setSelected(selectValue)
	}

	const [search, setSearch] = useState<string>('')
	const handleSearchChange = (search: string) => {
		setSearch(search)
	}

	const [open, setOpen] = useState(false)

	const fetchUserList = async () => {
		const {
			data: { data }
		} = await getGroupList()
		setUserList([...data])
	}
	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleAdd = async (realName: string) => {
		setOpen(false)
		setSelected([])
		await addGroup(realName)
		await fetchUserList()
	}

	const handleUpdate = async (id: string, newRealName: string) => {
		setOpen(false)
		setSelected([])
		await updateGroup(id, newRealName)
		await fetchUserList()
	}

	const handleDelete = async (id: string) => {
		await deleteGroup(id)
		await fetchUserList()
		setSelected([])
	}

	const handleClose = () => {
		setOpen(false)
	}
	const selectedItem = useMemo(() => {
		return userList.filter((item) => item._id === selected[0])
	}, [selected, userList])

	useEffect(() => {
		fetchUserList()
	}, [])
	return (
		<TableList<User>
			title='员工列表'
			headCells={headCells}
			rows={userList}
			selectBox={true}
			selected={selected}
			search={search}
			handleSelectChange={handleSelectChange}
			handleSearchChange={handleSearchChange}
		>
			<UsersTableEditList
				open={open}
				handleClose={handleClose}
				handleUpdate={handleUpdate}
				handleAdd={handleAdd}
				selectedItem={selectedItem[0]}
			/>
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
						<IconButton onClick={() => handleDelete(selectedItem[0]._id)}>
							<DeleteIcon />
						</IconButton>
					</Tooltip>
				</Stack>
			)}
		</TableList>
	)
}

export default RecordPage
