import { Box, Button, DialogActions, DialogContent, TextField } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { calculateOrderFee, finishOrder } from '../../api'
import TableModel from '../../components/common/tableModel/tableModel'
import { Manage } from '../../domin/Record'
import { RecordContext } from '../../provider/RecordProvider'
import { RoomContext } from '../../provider/RoomProvider'
import { RoomTypeFormat } from '../../utils/utils'

interface ManageTableEditListProps {
	open: boolean
	handleClose: () => void
	selectedItem: Manage

	resetSeleted: () => void
}

const ManageTableEditList: React.FC<ManageTableEditListProps> = (props) => {
	const { open, handleClose, selectedItem, resetSeleted } = props
	const { recordDispatch } = useContext(RecordContext)
	const { roomDispatch } = useContext(RoomContext)
	const [manage, setManage] = useState<Manage>(selectedItem)
	const [fee, setFee] = useState<string>('0')

	const handleChange = (e) => {
		const {
			target: { name, value }
		} = e
		setManage((preManage) => ({ ...preManage, [name]: value }))
	}

	const handleOrder = async () => {
		const { _id, roomId } = selectedItem
		recordDispatch({
			type: 'SET_HISTORY_RECORD_STATE',
			payload: { ...manage, checkOutDate: new Date().toISOString().slice(0, 10), fee }
		})
		roomDispatch({ type: 'UPDATE_ROOM_STATE', payload: manage.number })
		handleClose()
		await finishOrder(_id, roomId, fee)
		resetSeleted()
		window.location.reload()
	}

	const calculateFee = async () => {
		const { _id } = selectedItem
		const { data: fee } = await calculateOrderFee(_id)
		setFee(fee)
	}

	useEffect(() => {
		calculateFee()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<TableModel open={open} handleClose={handleClose} title='订单详情'>
			<DialogContent dividers>
				<Box
					component='form'
					sx={{
						'& .MuiTextField-root': { m: 1, width: '30ch' }
					}}
					noValidate
					autoComplete='off'
				>
					{selectedItem && (
						<>
							<div className='p-2'>订单信息</div>
							<div>
								<TextField
									id='outlined-number-required'
									label='房间号'
									defaultValue={selectedItem.number}
									onChange={handleChange}
								/>
								<TextField
									id='outlined-type-required'
									label='房间类型'
									defaultValue={RoomTypeFormat(selectedItem.type)}
									onChange={handleChange}
								/>
							</div>
							<div>
								<TextField
									id='outlined-price-required'
									label='姓名'
									defaultValue={selectedItem.customName}
									onChange={handleChange}
								/>
								<TextField
									id='outlined-price-required'
									label='身份证号'
									defaultValue={selectedItem.idCard}
									onChange={handleChange}
								/>
							</div>
							<div>
								<TextField
									id='outlined-price-required'
									label='电话'
									defaultValue={selectedItem.phone}
									onChange={handleChange}
								/>
								<TextField
									id='outlined-price-required'
									label='入住时间'
									defaultValue={selectedItem.checkInDate}
									onChange={handleChange}
								/>
							</div>
							<div className='p-2'>结算费用:{fee}</div>
						</>
					)}
				</Box>
			</DialogContent>
			<DialogActions>
				<Button variant='outlined' autoFocus onClick={handleOrder}>
					退房
				</Button>
			</DialogActions>
		</TableModel>
	)
}

export default ManageTableEditList
