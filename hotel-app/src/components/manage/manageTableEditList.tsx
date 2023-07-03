import TableModel from '../../components/common/tableModel/tableModel'
import { Button, DialogActions, DialogContent, Box, TextField } from '@mui/material'
import { Manage } from '../../domin/Record'

interface ManageTableEditListProps {
	open: boolean
	handleClose: () => void
	selectedItem: Manage
}

const ManageTableEditList: React.FC<ManageTableEditListProps> = (props) => {
	const { open, handleClose, selectedItem } = props
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
								<TextField id='outlined-number-required' label='房间号' defaultValue={selectedItem.number} />
								<TextField id='outlined-type-required' label='房间类型' defaultValue={selectedItem.type} />
							</div>
							<div>
								<TextField id='outlined-price-required' label='姓名' defaultValue={selectedItem.customName} />
								<TextField id='outlined-price-required' label='身份证号' defaultValue={selectedItem.idCard} />
							</div>
							<div>
								<TextField id='outlined-price-required' label='电话' defaultValue={selectedItem.phone} />
								<TextField
									id='outlined-price-required'
									label='入住时间'
									defaultValue={selectedItem.checkInDate.toDateString()}
								/>
							</div>
							<div className='p-2'>结算费用:</div>
						</>
					)}
				</Box>
			</DialogContent>
			<DialogActions>
				<Button variant='outlined' autoFocus onClick={handleClose}>
					退房
				</Button>
			</DialogActions>
		</TableModel>
	)
}

export default ManageTableEditList
