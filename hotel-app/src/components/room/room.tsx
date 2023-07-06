import AddBusinessIcon from '@mui/icons-material/AddBusiness'
import BedroomParentOutlinedIcon from '@mui/icons-material/BedroomParentOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack/Stack'
import Tooltip from '@mui/material/Tooltip/Tooltip'
import { useContext, useEffect, useMemo, useState } from 'react'
import { deleteRoom, getRoomList } from '../../api'
import { RoomHeadCell } from '../../domin/Headline'
import { Room } from '../../domin/Room'
import { Role } from '../../domin/User'
import { RoomContext } from '../../provider/RoomProvider'
import { UserContext } from '../../provider/UserProvider'
import TableList from '../common/tableList/tableList'
import RoomTableEditList from './roomTableEditList'
import RoomTableRentList from './roomTableRentList'
const headCells: RoomHeadCell[] = [
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
		id: 'price',
		numeric: true,
		disablePadding: false,
		label: '价格'
	},
	{
		id: 'status',
		numeric: true,
		disablePadding: false,
		label: '状态'
	}
]
const RoomPage: React.FC = () => {
	const { userState } = useContext(UserContext)
	const { roomState, roomDispatch } = useContext(RoomContext)
	const [selected, setSelected] = useState<string[]>([])
	const [search, setSearch] = useState<string>('')
	const [open, setOpen] = useState(false)

	const handleClickOpen = () => {
		setOpen(true)
	}
	const handleClose = () => {
		setOpen(false)
	}

	const resetSeleted = () => {
		setSelected([])
	}
	const handleSelectChange = (selectValue: string[]) => {
		setSelected(selectValue)
	}

	const handleSearchChange = (search: string) => {
		setSearch(search)
	}

	const selectedItem = useMemo(() => {
		return roomState.filter((item) => item._id === selected[0])
	}, [roomState, selected])

	const handleDelete = async (id: string) => {
		await deleteRoom(id)
		await fetchData()
		setSelected([])
	}

	const fetchData = async () => {
		const {
			data: { data }
		} = await getRoomList()

		roomDispatch({ type: 'SET_ROOM_LIST', payload: data })
	}

	useEffect(() => {
		fetchData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<TableList<Room>
				title='房间管理'
				headCells={headCells}
				rows={roomState}
				selectBox={true}
				selected={selected}
				search={search}
				handleSelectChange={handleSelectChange}
				handleSearchChange={handleSearchChange}
			>
				<RoomTableEditList
					open={open}
					handleClose={handleClose}
					selectedItem={selectedItem[0]}
					resetSeleted={resetSeleted}
				/>
				{selected.length > 0 && (
					<Stack spacing={1} direction='row'>
						{selected.length === 1 && userState.role === Role.ADMIN && (
							<>
								<Tooltip title='修改'>
									<IconButton onClick={() => handleClickOpen()}>
										<ModeEditIcon />
									</IconButton>
								</Tooltip>
								<Tooltip title='删除'>
									<IconButton onClick={() => handleDelete(selectedItem[0]._id)}>
										<DeleteIcon />
									</IconButton>
								</Tooltip>
							</>
						)}
						{selected.length === 1 && userState.role === Role.REGULAR && (
							<>
								<Tooltip title='租用'>
									<IconButton onClick={() => handleClickOpen()}>
										<BedroomParentOutlinedIcon />
									</IconButton>
								</Tooltip>
								<RoomTableRentList
									open={open}
									handleClose={handleClose}
									selectedItem={selectedItem[0]}
									resetSeleted={resetSeleted}
								/>
							</>
						)}
					</Stack>
				)}
				{selected.length === 0 && userState.role === Role.ADMIN && (
					<>
						<Tooltip title='添加'>
							<IconButton onClick={() => handleClickOpen()}>
								<AddBusinessIcon />
							</IconButton>
						</Tooltip>
					</>
				)}
			</TableList>
		</>
	)
}

export default RoomPage
