import { Box, Button, DialogActions, DialogContent, TextField } from '@mui/material'
import { useState } from 'react'
import TableModel from '../../components/common/tableModel/tableModel'
import { User } from '../../domin/User'

interface UsersTableEditListProps {
	open: boolean
	handleAdd: (name: string) => void

	handleUpdate: (id: string, realName: string) => void

	handleClose: () => void
	selectedItem?: User
}

const UsersTableEditList: React.FC<UsersTableEditListProps> = (props) => {
	const { open, handleAdd, selectedItem, handleUpdate, handleClose } = props
	const tempName = !selectedItem ? '' : selectedItem.realName
	const [realName, setRealName] = useState<string>(tempName)
	const handleInput = (e) => {
		const {
			target: { value }
		} = e
		setRealName(value)
	}
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
							<TextField
								id='outlined-realName-required'
								label='真实姓名'
								defaultValue={selectedItem.realName}
								onInput={handleInput}
							/>
						</div>
					) : (
						<div>
							<TextField id='outlined-realName-required' label='真实姓名' defaultValue='' onInput={handleInput} />
						</div>
					)}
				</Box>
			</DialogContent>
			<DialogActions>
				<Button
					variant='outlined'
					autoFocus
					onClick={() => (!selectedItem ? handleAdd(realName) : handleUpdate(selectedItem._id, realName))}
				>
					{!selectedItem ? '添加' : '修改'}
				</Button>
			</DialogActions>
		</TableModel>
	)
}

export default UsersTableEditList
