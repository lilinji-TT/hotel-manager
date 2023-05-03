import { Grid, Stack, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import * as React from 'react'
import { Record, RecordStatus } from '../domin/Record'
import { Room, RoomStatus, RoomType } from '../domin/Room'
import { RecordContext } from '../provider/RecordProvider'
export default function useAdminRoomFormDialog() {
	const [open, setOpen] = React.useState(false)
	const [singleRoom, setSingleRoom] = React.useState<Room>({} as Room)
	const handleClickOpen = () => setOpen(true)

	const EmployeeFormDialog = ({ handleSave }) => {
		const { recordDispatch } = React.useContext(RecordContext)
		const [record, setRecord] = React.useState<Record>({} as Record)
		const handleChange = (e) => {
			const {
				target: { name, value }
			} = e
			setRecord((preRecord) => ({ ...preRecord, [name]: value }))
		}
		const handleFormClose = () => {
			handleSave(singleRoom, { ...singleRoom, status: RoomStatus.OCCUPIED })
			const recordData = {
				_id: '',
				roomId: '',
				type: RoomType.NONE,
				number: singleRoom.number,
				customName: record.customName,
				idCard: record.idCard,
				phone: record.phone,
				checkInDate: record.checkInDate,
				checkOutDate: new Date(''),
				fee: 0,
				status: RecordStatus.PROCESSING,
				handlerName: record.handlerName
			}
			recordDispatch({ type: 'SET_RECORD_STATE', payload: recordData })
			setOpen(false)
		}
		return (
			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogTitle sx={{ width: '100%', textAlign: 'center' }}>客户入住信息填写</DialogTitle>
				<DialogContent>
					<Grid
						container
						rowSpacing={0}
						columnSpacing={{ xs: 1, sm: 2, md: 3 }}
						sx={{ width: '100%', textAlign: 'center' }}
					>
						<Grid item xs={6}>
							房间号:{singleRoom.number}
						</Grid>
						<Grid item xs={6}>
							房间价格:{singleRoom.price}
						</Grid>
						<Grid item xs={6}>
							房间状态:{singleRoom.status}
						</Grid>
						<Grid item xs={6}>
							房间种类:{singleRoom.type}
						</Grid>
					</Grid>
					<TextField
						name='customName'
						margin='dense'
						label='姓名'
						type='text'
						fullWidth
						variant='outlined'
						onChange={handleChange}
					/>
					<TextField
						name='idCard'
						label='身份证号'
						margin='dense'
						type='text'
						fullWidth
						variant='outlined'
						onChange={handleChange}
					/>
					<TextField
						name='phone'
						margin='dense'
						label='手机号'
						type='tel'
						fullWidth
						variant='outlined'
						onChange={handleChange}
					/>
					<TextField
						name='checkInDate'
						margin='dense'
						label='入住日期'
						type='date'
						fullWidth
						variant='outlined'
						defaultValue={new Date().toISOString().slice(0, 10)}
						onChange={handleChange}
					/>
					<TextField
						name='handlerName'
						margin='dense'
						label='处理人'
						type='text'
						fullWidth
						variant='outlined'
						onChange={handleChange}
					/>
				</DialogContent>
				<DialogActions>
					<Stack direction='row' spacing={53.5}>
						<Button onClick={handleFormClose} variant='contained'>
							确定租出
						</Button>
						<Button onClick={() => setOpen(false)} variant='contained'>
							取消
						</Button>
					</Stack>
				</DialogActions>
			</Dialog>
		)
	}

	return { EmployeeFormDialog, open: handleClickOpen, get: setSingleRoom }
}
