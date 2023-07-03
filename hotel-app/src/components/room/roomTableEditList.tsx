import { Room } from '../../domin/Room'
import TableModel from '../../components/common/tableModel/tableModel'
import { Button, DialogActions, DialogContent, Box, TextField, MenuItem } from '@mui/material'
import { RoomStatus } from '../../domin/Room'

interface RoomTableListProps {
	open: boolean
	handleClose: () => void
	selectedItem: Room
}

const RoomTableEditList: React.FC<RoomTableListProps> = (props) => {
	const { open, handleClose, selectedItem } = props
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
					{selectedItem && (
						<>
							<div>
								<TextField required id='outlined-number-required' label='房间号' defaultValue={selectedItem.number} />
							</div>
							<div>
								<TextField required id='outlined-type-required' label='房间类型' defaultValue={selectedItem.type} />
							</div>
							<div>
								<TextField required id='outlined-price-required' label='价格' defaultValue={selectedItem.price} />
							</div>
							<div>
								<TextField id='outlined-select-currency' select label='状态' defaultValue={RoomStatus.AVAILABLE}>
									{Object.values(RoomStatus).map((status, index) => (
										<MenuItem key={`${status}_${index}`} value={status}>
											{status}
										</MenuItem>
									))}
								</TextField>
							</div>
						</>
					)}
				</Box>
			</DialogContent>
			<DialogActions>
				<Button variant='outlined' autoFocus onClick={handleClose}>
					保存
				</Button>
			</DialogActions>
		</TableModel>
	)
}

export default RoomTableEditList
