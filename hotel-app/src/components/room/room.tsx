import { RoomHeadCell } from '../../domin/Headline'
import TableList from '../common/tableList/tableList'
import { Room } from '../../domin/Room'
import { useContext, useEffect, useMemo, useState } from 'react'
import Tooltip from '@mui/material/Tooltip/Tooltip'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import BedroomParentOutlinedIcon from '@mui/icons-material/BedroomParentOutlined'
import AddBusinessIcon from '@mui/icons-material/AddBusiness'
import Stack from '@mui/material/Stack/Stack'
import { UserContext } from '../../provider/UserProvider'
import { Role } from '../../domin/User'
import RoomTableEditList from './roomTableEditList'
import RoomTableRentList from './roomTableRentList'
import { RoomContext } from '../../provider/RoomProvider'
import { getRoomList } from '../../api'
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

	const handleSelectChange = (selectValue: string[]) => {
		setSelected(selectValue)
	}

	const handleSearchChange = (search: string) => {
		setSearch(search)
	}

	const selectedItem = useMemo(() => {
		return roomState.filter((item) => item._id === selected[0])
	}, [roomState, selected])

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
				<RoomTableEditList open={open} handleClose={handleClose} selectedItem={selectedItem[0]} />
				{selected.length > 0 && (
					<Stack spacing={1} direction='row'>
						{selected.length === 1 && userState.role === Role.ADMIN && (
							<>
								<Tooltip title='修改'>
									<IconButton>
										<ModeEditIcon />
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
								<RoomTableRentList open={open} handleClose={handleClose} selectedItem={selectedItem[0]} />
							</>
						)}
						<Tooltip title='删除'>
							<IconButton>
								<DeleteIcon />
							</IconButton>
						</Tooltip>
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
