import { MenuItem, Select, Stack } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import * as React from 'react'
import { Room, RoomStatus, RoomType } from '../domin/Room'
export default function useAdminRoomFormDialog() {
	const [open, setOpen] = React.useState(false)
	const [singleRoom, setSingleRoom] = React.useState<Room>({} as Room)

	const handleClickOpen = () => setOpen(true)

	const AdminFormDialog = ({ handleSave }) => {
		const [tempRoom, setTempRoom] = React.useState<Room>(singleRoom)

		const handleChange = (e) => {
			const {
				target: { name, value }
			} = e
			setTempRoom((prevRoom) => ({ ...prevRoom, [name]: value }))
		}
		const handleFormClose = () => {
			handleSave(singleRoom, tempRoom)
			setOpen(false)
		}
		return (
			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogTitle>房间信息编辑</DialogTitle>
				<DialogContent>
					<div>
						<label>房间号</label>
						<TextField
							name='number'
							margin='dense'
							type='text'
							fullWidth
							variant='outlined'
							defaultValue={tempRoom.number}
							onChange={handleChange}
						/>
					</div>
					<div style={{ marginTop: '8px' }}>
						<label>房间种类</label>
						<Select
							name='type'
							value={tempRoom.type}
							aria-hidden={false}
							fullWidth
							onChange={handleChange}
							sx={{ marginTop: '8px' }}
						>
							<MenuItem value={RoomType.DELUXE}>{RoomType.DELUXE}</MenuItem>
							<MenuItem value={RoomType.DOUNLE}>{RoomType.DOUNLE}</MenuItem>
							<MenuItem value={RoomType.NONE}>{RoomType.NONE}</MenuItem>
							<MenuItem value={RoomType.SINGLE}>{RoomType.SINGLE}</MenuItem>
							<MenuItem value={RoomType.TWIN}>{RoomType.TWIN}</MenuItem>
						</Select>
					</div>
					<div style={{ marginTop: '8px' }}>
						<label>房间价格</label>
						<TextField
							name='price'
							margin='dense'
							type='number'
							fullWidth
							variant='outlined'
							defaultValue={tempRoom.price}
							onChange={handleChange}
						/>
					</div>
					<div style={{ marginTop: '8px' }}>
						<label>房间状态</label>
						<Select name='status' value={tempRoom.status} onChange={handleChange} fullWidth sx={{ marginTop: '8px' }}>
							<MenuItem value={RoomStatus.AVAILABLE}>{RoomStatus.AVAILABLE}</MenuItem>
							<MenuItem value={RoomStatus.OCCUPIED}>{RoomStatus.OCCUPIED}</MenuItem>
						</Select>
					</div>
				</DialogContent>
				<DialogActions>
					<Stack direction='row' spacing={53.5}>
						<Button onClick={handleFormClose} variant='contained'>
							确定保存
						</Button>
						<Button onClick={() => setOpen(false)} variant='contained'>
							取消
						</Button>
					</Stack>
				</DialogActions>
			</Dialog>
		)
	}

	return { AdminFormDialog, open: handleClickOpen, get: setSingleRoom }
}
