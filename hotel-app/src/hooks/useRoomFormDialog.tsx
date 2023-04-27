import { Stack } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import * as React from 'react'
import { Room } from '../domin/Room'
export default function useRoomFormDialog() {
	const [open, setOpen] = React.useState(false)
	const [singleRoom, setSingleRoom] = React.useState<Room>({} as Room)

	const handleClickOpen = () => setOpen(true)

	const handleClose = (field?: string) => {
		if (field === 'save') {
			//...
		}
		setOpen(false)
	}

	const FormDialog = ({ handleSave }) => {
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
			<Dialog open={open} onClose={() => handleClose()}>
				<DialogTitle>房间信息编辑</DialogTitle>
				<DialogContent>
					<TextField
						name='number'
						margin='dense'
						label='房间号'
						type='text'
						fullWidth
						variant='outlined'
						value={tempRoom.number}
						onChange={handleChange}
					/>
					<TextField
						name='type'
						margin='dense'
						label='房间类型'
						type='text'
						fullWidth
						variant='outlined'
						value={tempRoom.type}
						onChange={handleChange}
					/>
					<TextField
						name='price'
						margin='dense'
						label='房间价格'
						type='number'
						fullWidth
						variant='outlined'
						value={tempRoom.price}
						onChange={handleChange}
					/>
					<TextField
						name='status'
						margin='dense'
						label='房间状态'
						type='text'
						fullWidth
						variant='outlined'
						value={tempRoom.status}
						onChange={handleChange}
					/>
				</DialogContent>
				<DialogActions>
					<Stack direction='row' spacing={53.5}>
						<div>
							<Button onClick={handleFormClose} variant='contained'>
								确定保存
							</Button>
						</div>
						<div>
							<Button onClick={() => handleClose()} variant='contained'>
								取消
							</Button>
						</div>
					</Stack>
				</DialogActions>
			</Dialog>
		)
	}

	return { FormDialog, open: handleClickOpen, get: setSingleRoom }
}
