import React from 'react'
import TableModelTitle from './tableModelTitle'
import TableModelStyle from './tableModelStyle'
import { TableModelProps } from '../../../domin/Table'

const TableModel: React.FC<TableModelProps> = (props) => {
	const { title, open, handleClose, children } = props

	return (
		<div>
			<TableModelStyle onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
				<TableModelTitle id='customized-dialog-title' onClose={handleClose}>
					{title}
				</TableModelTitle>
				{children}
			</TableModelStyle>
		</div>
	)
}

export default TableModel
