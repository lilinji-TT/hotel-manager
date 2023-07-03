import { Box, Button, Table } from '@mui/material'
import { useContext, useEffect } from 'react'
import { addRoom, deleteRoom, getRoomList, updateRoom } from '../../api'
import type { Room } from '../../domin/Room'
import { RoomStatus, RoomType } from '../../domin/Room'
import { Role } from '../../domin/User'
import useAdminRoomFormDialog from '../../hooks/useAdminRoomFormDialog'
import useEmployeeRoomFormDialog from '../../hooks/useEmployeeRoomFormDialog'
import { RoomContext } from '../../provider/RoomProvider'
import { UserContext } from '../../provider/UserProvider'
export interface RoomListProps {
	roomList: Room[]
}
export const RoomListPage: React.FC<RoomListProps> = () => {
	const { userState } = useContext(UserContext)
	const { roomState, roomDispatch } = useContext(RoomContext)
	const { AdminFormDialog, open, get } = useAdminRoomFormDialog()
	const { EmployeeFormDialog, open: handleOpen, get: handleGet } = useEmployeeRoomFormDialog()

	const handleDelete = async (_id: string) => {
		roomDispatch({ type: 'DELETE_SINGLE_ROOM', payload: _id })
		await deleteRoom(_id)
	}
	const handleAdd = async () => {
		roomDispatch({
			type: 'ADD_SINGLE_ROOM',
			payload: {
				_id: `${Date.now()}`,
				number: '001',
				price: 100,
				status: RoomStatus.AVAILABLE,
				type: RoomType.SINGLE
			}
		})
		await addRoom(RoomType.SINGLE, `001`, 100)
	}

	const handleEdit = (room: Room) => {
		if (userState.role === Role.ADMIN) {
			get(room)
			open()
		} else {
			handleGet(room)
			handleOpen()
		}
	}

	const handleSave = (room, tempRoom) => {
		roomDispatch({ type: 'SET_ROOM_STATE', payload: tempRoom })
		const { number, price, type, _id } = tempRoom
		updateRoom(_id, type, number, price)
	}

	const Room = ({ room }) => {
		return (
			<>
				<td>{room.number}</td>
				<td>{room.type}</td>
				<td>{room.price}</td>
				<td>{room.status}</td>
				<td>
					{userState.role === Role.ADMIN ? (
						<>
							<Button variant='text' color='primary' onClick={() => handleEdit(room)}>
								编辑
							</Button>
							<Button
								disabled={room.status === RoomStatus.OCCUPIED}
								variant='text'
								color='error'
								onClick={() => handleDelete(room._id)}
							>
								删除
							</Button>
						</>
					) : (
						<Button
							disabled={room.status === RoomStatus.OCCUPIED}
							variant='text'
							color='primary'
							onClick={() => handleEdit(room)}
						>
							租出
						</Button>
					)}
				</td>
			</>
		)
	}
	const fetchData = async () => {
		try {
			// 执行异步操作
			const {
				data: { data }
			} = await getRoomList()

			// 处理获取到的数据
			roomDispatch({ type: 'SET_ROOM_LIST', payload: data })
		} catch (error) {
			// 处理错误
		}
	}
	useEffect(() => {
		fetchData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<>
			<Table
				aria-label='basic table'
				sx={{
					'& tr > *:first-of-type".': {
						position: 'sticky',
						left: 0,
						boxShadow: '1px 0 var(--TableCell-borderColor)',
						bgcolor: 'background.surface'
					},
					'& tr > *:last-child': {
						position: 'sticky',
						right: 0,
						bgcolor: 'var(--TableCell-headBackground)'
					}
				}}
			>
				<thead>
					<tr>
						<th style={{ width: 200 }}>房间号</th>
						<th style={{ width: 200 }}>房间类型&nbsp;</th>
						<th style={{ width: 200 }}>房间价位&nbsp;(元)</th>
						<th style={{ width: 200 }}>当前状态&nbsp;</th>
						<th aria-label='last' style={{ width: 'var(--Table-lastColumnWidth)' }} />
					</tr>
				</thead>
				<tbody>
					{roomState.map((room) => {
						return (
							<tr key={room._id}>
								<Room room={room} />
							</tr>
						)
					})}
				</tbody>
			</Table>
			<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
				{userState.role === Role.ADMIN && (
					<Button size='small' variant='text' color='error' onClick={() => handleAdd()}>
						增加记录
					</Button>
				)}
			</Box>
			<AdminFormDialog handleSave={handleSave} />
			<EmployeeFormDialog handleSave={handleSave} />
		</>
	)
}
