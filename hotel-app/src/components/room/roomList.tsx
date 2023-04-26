import { Box, Button, MenuItem, Select, Table } from '@mui/material'
import { useState } from 'react'
import type { Room } from '../../domin/Room'
import { RoomStatus, RoomType } from '../../domin/Room'
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
	const handleEdit = () => {
		setEdit(EDIT.YES)
	}
	const Switch = ({ room, isEdit }) => {
		const [tempRoom, setTempRoom] = useState(room)

		const handleInputChange = (event) => {
			const { name, value } = event.target
			setTempRoom((prevRoom) => ({ ...prevRoom, [name]: value }))
		}

		const handleSelectChange = (event) => {
			const { name, value } = event.target
			setTempRoom((prevRoom) => ({ ...prevRoom, [name]: value }))
		}

		const handleSave = () => {
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

		const editContent = (
			<>
				<td>
					<input type='text' name='number' value={tempRoom.number} onChange={handleInputChange} />
				</td>
				<td>
					<Select name='type' value={tempRoom.type} label='Type' onChange={handleSelectChange}>
						<MenuItem value={RoomType.DELUXE}>{RoomType.DELUXE}</MenuItem>
						<MenuItem value={RoomType.DOUNLE}>{RoomType.DOUNLE}</MenuItem>
						<MenuItem value={RoomType.NONE}>{RoomType.NONE}</MenuItem>
						<MenuItem value={RoomType.SINGLE}>{RoomType.SINGLE}</MenuItem>
						<MenuItem value={RoomType.TWIN}>{RoomType.TWIN}</MenuItem>
					</Select>
				</td>
				<td>
					<input type='number' name='price' value={tempRoom.price} onChange={handleInputChange} />
				</td>
				<td>
					<Select name='status' value={tempRoom.status} label='Status' onChange={handleSelectChange}>
						<MenuItem value={RoomStatus.AVAILABLE}>{RoomStatus.AVAILABLE}</MenuItem>
						<MenuItem value={RoomStatus.OCCUPIED}>{RoomStatus.OCCUPIED}</MenuItem>
					</Select>
				</td>
				<td>
					<Button variant='text' onClick={handleSave}>
						保存
					</Button>
				</td>
			</>
		)

		const defaultContent = (
			<>
				<td>{room.number}</td>
				<td>{room.type}</td>
				<td>{room.price}</td>
				<td>{room.status}</td>
				<td>
					<Button variant='text' color='primary' onClick={handleEdit}>
						编辑
					</Button>
					<Button variant='text' color='error' onClick={() => handleDelete(room._id)}>
						删除
					</Button>
				</td>
			</>
		)

		return <>{isEdit === EDIT.YES ? editContent : defaultContent}</>
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
								<Switch room={room} isEdit={Edit} />
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
		</>
	)
}
