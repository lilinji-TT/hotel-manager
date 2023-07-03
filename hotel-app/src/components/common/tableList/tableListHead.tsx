import React from 'react'
import { TableHead, TableRow, TableCell, Checkbox, TableSortLabel, Box } from '@mui/material'
import { TableListHeadProps } from '../../../domin/Table'
const TableListHead = <T extends object>(props: TableListHeadProps<T>) => {
	const { onSelectAllClick, order, orderBy, headCells, numSelected, rowCount, selectBox, onRequestSort } = props

	const createSortHandler = (property: keyof T) => (event: React.MouseEvent<unknown>) => {
		onRequestSort(event, property)
	}

	return (
		<TableHead>
			<TableRow>
				{selectBox && (
					<TableCell padding='checkbox'>
						<Checkbox
							color='primary'
							indeterminate={numSelected > 0 && numSelected < rowCount}
							checked={rowCount > 0 && numSelected === rowCount}
							onChange={onSelectAllClick}
							inputProps={{
								'aria-label': 'select all desserts'
							}}
						/>
					</TableCell>
				)}

				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align='left'
						padding={headCell.disablePadding && selectBox ? 'none' : 'normal'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id as keyof T)}
						>
							{headCell.label}
							{orderBy === headCell.id ? <Box component='span'>{order === 'desc' ? '(降)' : '(升)'}</Box> : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	)
}

export default TableListHead
