import TableModel from '../../components/common/tableModel/tableModel'
import { Button, DialogActions, DialogContent, Box, TextField } from '@mui/material'
import { User } from '../../domin/User'

interface UsersTableEditListProps {
	open: boolean
	handleClose: () => void
	selectedItem?: User
}

const UsersTableEditList: React.FC<UsersTableEditListProps> = (props) => {
	const { open, handleClose, selectedItem } = props
	return (
		<TableModel open={open} handleClose={handleClose} title='用户详情'>
			<DialogContent dividers>
				<Box
					component='form'
					sx={{
						'& .MuiTextField-root': { m: 1, width: '30ch' }
					}}
					noValidate
					autoComplete='off'
				>
					{selectedItem ? (
						<div>
							<TextField id='outlined-realName-required' label='真实姓名' defaultValue={selectedItem.realName} />
						</div>
					) : (
						<div>
							<TextField id='outlined-realName-required' label='真实姓名' defaultValue='' />
						</div>
					)}
				</Box>
			</DialogContent>
			<DialogActions>
				<Button variant='outlined' autoFocus onClick={handleClose}>
					{!selectedItem ? '添加' : '修改'}
				</Button>
			</DialogActions>
		</TableModel>
	)
}

export default UsersTableEditList
