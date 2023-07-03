import { Room } from '../../domin/Room'
import TableModel from '../../components/common/tableModel/tableModel'
import { Button, DialogActions, DialogContent, Box, TextField } from '@mui/material'

interface RoomTableRentListProps {
	open: boolean
	handleClose: () => void
	selectedItem: Room
}

const RoomTableRentList: React.FC<RoomTableRentListProps> = (props) => {
	const { open, handleClose, selectedItem } = props
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
									defaultValue={selectedItem.type}
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
									defaultValue={selectedItem.status}
								/>
							</div>
							<div className='p-2'>客户信息</div>
							<div>
								<TextField required id='outlined-name-required' label='姓名' />
								<TextField required id='outlined-phone-required' label='手机号' />
								<TextField required id='outlined-idCard-required' label='身份证号' />
							</div>
						</>
					)}
				</Box>
			</DialogContent>
			<DialogActions>
				<Button variant='outlined' autoFocus onClick={handleClose}>
					租出
				</Button>
			</DialogActions>
		</TableModel>
	)
}

export default RoomTableRentList
