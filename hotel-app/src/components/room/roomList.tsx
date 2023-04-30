import { Box, Button, Table } from '@mui/material'
import { useState } from 'react'
import type { Room } from '../../domin/Room'
import { RoomStatus, RoomType } from '../../domin/Room'
import useRoomFormDialog from '../../hooks/useRoomFormDialog'
export interface RoomListProps {
	roomList: Room[]
}
enum EDIT {
	YES = 'YES',
	NO = 'NO'
}
export const RoomListPage: React.FC<RoomListProps> = ({ roomList }) => {
	const [Edit, setEdit] = useState<EDIT>(EDIT.NO)
	const [rooms, setRooms] = useState(roomList)

	const { FormDialog, open, get } = useRoomFormDialog()

	const handleDelete = (_id: string) => {
		const updatedRooms = [...rooms]
		const index = updatedRooms.findIndex((room) => room._id === _id)
		updatedRooms.splice(index, 1)
		setRooms(updatedRooms)
	}
	const handleAdd = () => {
		setRooms([
			...rooms,
			{
				_id: `${Date.now()}`,
				number: `${Date.now()}`,
				price: 100,
				status: RoomStatus.AVAILABLE,
				type: RoomType.SINGLE
			}
		])
	}
	const handleEdit = (room: Room) => {
		get(room)
		open()
	}
	const handleSave = (room, tempRoom) => {
		setRooms((prevRooms) =>
			prevRooms.map((prevRoom) => {
				if (prevRoom._id === room._id) {
					return tempRoom
				}
				return prevRoom
			})
		)
		setEdit(EDIT.NO)
	}
	const Switch = ({ room }) => {
		return (
			<>
				<td>{room.number}</td>
				<td>{room.type}</td>
				<td>{room.price}</td>
				<td>{room.status}</td>
				<td>
					<Button variant='text' color='primary' onClick={() => handleEdit(room)}>
						编辑
					</Button>
					<Button variant='text' color='error' onClick={() => handleDelete(room._id)}>
						删除
					</Button>
				</td>
			</>
		)
	}
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
					{rooms.map((room) => {
						return (
							<tr key={room._id}>
								<Switch room={room} />
							</tr>
						)
					})}
				</tbody>
			</Table>
			<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
				<Button size='small' variant='text' color='error' onClick={() => handleAdd()}>
					增加记录
				</Button>
			</Box>
			<FormDialog handleSave={handleSave} />
		</>
	)
}
