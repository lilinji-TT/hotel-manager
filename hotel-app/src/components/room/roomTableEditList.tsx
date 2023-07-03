import { Room, RoomType } from '../../domin/Room'
import TableModel from '../../components/common/tableModel/tableModel'
import { Button, DialogActions, DialogContent, Box, TextField, MenuItem } from '@mui/material'
import { useContext, useState } from 'react'
import { RoomContext } from '../../provider/RoomProvider'
import { updateRoom, addRoom } from '../../api'
import { RoomTypeFormat } from '../../utils/utils'

interface RoomTableListProps {
	open: boolean
	handleClose: () => void
	selectedItem?: Room
}

const RoomTableEditList: React.FC<RoomTableListProps> = (props) => {
	const { open, handleClose, selectedItem } = props
	const { roomDispatch } = useContext(RoomContext)
	const [room, setRoom] = useState<Room | object>(selectedItem || {})
	const handleChange = (e) => {
		const {
			target: { name, value }
		} = e
		setRoom((prevRoom) => ({ ...prevRoom, [name]: value }))
	}

	const handleEdit = async () => {
		if (Object.values(room).length > 0 && (room as Room).type && (room as Room).type !== RoomType.NONE) {
			if (selectedItem) {
				const { _id, type, number, price } = room as Room
				const {
					data: { data }
				} = await updateRoom(_id, type, number, price)
				roomDispatch({ type: 'SET_ROOM_STATE', payload: data })
			} else {
				const { type, number, price } = room as Room
				const {
					data: { data }
				} = await addRoom(type, number, price)
				roomDispatch({
					type: 'ADD_SINGLE_ROOM',
					payload: data
				})
			}
			handleClose()
		}
	}

	return (
		<TableModel open={open} handleClose={handleClose} title='房间详情'>
			<DialogContent dividers>
				<Box
					component='form'
					sx={{
						'& .MuiTextField-root': { m: 1, width: '50ch' }
					}}
					noValidate
					autoComplete='off'
				>
					{selectedItem ? (
						<>
							<div>
								<TextField
									required
									id='outlined-number-required'
									label='房间号'
									name='number'
									onChange={handleChange}
									defaultValue={selectedItem.number}
								/>
							</div>
							<div>
								<TextField
									id='outlined-type-currency'
									select
									label='房间类型'
									name='type'
									onChange={handleChange}
									defaultValue={RoomTypeFormat(selectedItem.type)}
								>
									{Object.values(RoomType).map((type, index) => (
										<MenuItem key={`${type}_${index}`} value={type}>
											{type}
										</MenuItem>
									))}
								</TextField>
							</div>
							<div>
								<TextField
									required
									id='outlined-price-required'
									label='价格'
									name='price'
									onChange={handleChange}
									defaultValue={selectedItem.price}
								/>
							</div>
							{/* <div>
								<TextField
									id='outlined-status-currency'
									select
									label='状态'
									name='status'
									onChange={handleChange}
									defaultValue={selectedItem.status}
								>
									{Object.values(RoomStatus).map((status, index) => (
										<MenuItem key={`${status}_${index}`} value={status}>
											{status}
										</MenuItem>
									))}
								</TextField>
							</div> */}
						</>
					) : (
						<>
							<div>
								<TextField
									required
									id='outlined-number-required'
									label='房间号'
									name='number'
									onChange={handleChange}
								/>
							</div>
							<div>
								<TextField
									id='outlined-type-currency'
									select
									label='房间类型'
									name='type'
									onChange={handleChange}
									defaultValue={RoomType.NONE}
								>
									{Object.values(RoomType).map((type, index) => (
										<MenuItem key={`${type}_${index}`} value={type}>
											{RoomTypeFormat(type)}
										</MenuItem>
									))}
								</TextField>
							</div>
							<div>
								<TextField
									required
									id='outlined-price-required'
									InputLabelProps={{
										shrink: true
									}}
									label='价格'
									type='number'
									name='price'
									onChange={handleChange}
								/>
							</div>
							{/* <div>
								<TextField
									id='outlined-select-currency'
									select
									label='状态'
									name='status'
									onChange={handleChange}
									defaultValue={RoomStatus.AVAILABLE}
								>
									{Object.values(RoomStatus).map((status, index) => (
										<MenuItem key={`${status}_${index}`} value={status}>
											{status}
										</MenuItem>
									))}
								</TextField>
							</div> */}
						</>
					)}
				</Box>
			</DialogContent>
			<DialogActions>
				<Button variant='outlined' autoFocus onClick={handleEdit}>
					{selectedItem ? '保存' : '添加'}
				</Button>
			</DialogActions>
		</TableModel>
	)
}

export default RoomTableEditList
