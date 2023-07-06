import { Box, Button, DialogActions, DialogContent, TextField } from '@mui/material'
import { useContext, useState } from 'react'
import { addOrder } from '../../api'
import TableModel from '../../components/common/tableModel/tableModel'
import { Room } from '../../domin/Room'
import { RoomContext } from '../../provider/RoomProvider'
import { UserContext } from '../../provider/UserProvider'
import { RoomStatusFormat, RoomTypeFormat } from '../../utils/utils'

interface RoomTableRentListProps {
	open: boolean
	handleClose: () => void
	selectedItem: Room
	resetSeleted: () => void
}

const RoomTableRentList: React.FC<RoomTableRentListProps> = (props) => {
	const { userState } = useContext(UserContext)
	const { roomDispatch } = useContext(RoomContext)
	const { open, handleClose, selectedItem, resetSeleted } = props
	const [rent, setRent] = useState<{ customName: string; phone: string; idCard: string } | object>({})
	const handleChange = (e) => {
		const {
			target: { name, value }
		} = e
		setRent((prevRent) => ({ ...prevRent, [name]: value }))
	}

	const handleRent = async () => {
		const { customName, phone, idCard } = rent as { customName: string; phone: string; idCard: string }
		const {
			data: { data }
		} = await addOrder(
			selectedItem._id,
			selectedItem.type,
			selectedItem.number,
			customName,
			idCard,
			phone,
			userState.realName
		)
		roomDispatch({ type: 'SET_ROOM_STATE', payload: data })
		resetSeleted()
		window.location.reload()
		handleClose()
	}

	return (
		<TableModel open={open} handleClose={handleClose} title='房间详情'>
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
							<div className='p-2'>房间信息</div>
							<div>
								<TextField
									id='outlined-number-required'
									label='房间号'
									InputProps={{
										readOnly: true
									}}
									defaultValue={selectedItem.number}
								/>
								<TextField
									id='outlined-type-required'
									label='房间类型'
									InputProps={{
										readOnly: true
									}}
									defaultValue={RoomTypeFormat(selectedItem.type)}
								/>
							</div>
							<div>
								<TextField
									id='outlined-price-required'
									label='价格'
									InputProps={{
										readOnly: true
									}}
									defaultValue={selectedItem.price}
								/>
								<TextField
									id='outlined-status-required'
									label='状态'
									InputProps={{
										readOnly: true
									}}
									defaultValue={RoomStatusFormat(selectedItem.status)}
								/>
							</div>
							<div className='p-2'>客户信息</div>
							<div>
								<TextField
									required
									id='outlined-name-required'
									name='customName'
									label='姓名'
									onChange={handleChange}
								/>
								<TextField required id='outlined-phone-required' name='phone' label='手机号' onChange={handleChange} />
								<TextField
									required
									id='outlined-idCard-required'
									name='idCard'
									label='身份证号'
									onChange={handleChange}
								/>
							</div>
						</>
					)}
				</Box>
			</DialogContent>
			<DialogActions>
				<Button variant='outlined' autoFocus onClick={handleRent}>
					租出
				</Button>
			</DialogActions>
		</TableModel>
	)
}

export default RoomTableRentList
