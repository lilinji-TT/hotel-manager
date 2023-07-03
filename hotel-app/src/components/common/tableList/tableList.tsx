import React, { useState } from 'react'
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TablePagination,
	TableRow,
	Paper,
	Checkbox
} from '@mui/material'
import TableListHead from './tableListHead'
import TableListToolbar from './tableListToolbar'
import { Order, TableListProps } from '../../../domin/Table'
import { Id } from '../../../domin/Entity'
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1
	}
	if (b[orderBy] > a[orderBy]) {
		return 1
	}
	return 0
}

function getComparator<Key extends keyof any>(
	order: Order,
	orderBy: Key
): (a: { [key in Key]: any }, b: { [key in Key]: any }) => number {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
	const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0])
		if (order !== 0) {
			return order
		}
		return a[1] - b[1]
	})
	return stabilizedThis.map((el) => el[0])
}

const TableList = <T extends { _id: Id }>(props: TableListProps<T>) => {
	const { title, headCells, rows, selectBox, children, selected, handleSelectChange, search, handleSearchChange } =
		props
	const [order, setOrder] = useState<Order>('asc')
	const [orderBy, setOrderBy] = useState<keyof T>(headCells[0].id as keyof T)
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)

	const handleRequestSort = (_event: React.MouseEvent<unknown>, property: keyof T) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}

	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			const newSelected = rows.map((n) => n._id)
			handleSelectChange(newSelected)
			return
		}
		handleSelectChange([])
	}

	const handleClick = (_event: React.MouseEvent<unknown>, name: string) => {
		if (!selectBox) {
			return ''
		}
		const selectedIndex = selected.indexOf(name)
		let newSelected: string[] = []

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name)
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1))
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1))
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
		}

		handleSelectChange(newSelected)
	}

	const handleChangePage = (_event: unknown, newPage: number) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	const isSelected = (name: string) => selected.indexOf(name) !== -1

	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

	const visibleRows = React.useMemo(
		() => stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
		[order, orderBy, page, rows, rowsPerPage]
	)

	return (
		<Box sx={{ width: '100%' }}>
			<Paper sx={{ width: '100%' }}>
				<TableListToolbar
					numSelected={selected.length}
					title={title}
					search={search}
					handleSearchChange={handleSearchChange}
				>
					{children}
				</TableListToolbar>
				<TableContainer>
					<Table sx={{ minWidth: 500 }} aria-labelledby='tableTitle' size='medium'>
						<TableListHead<T>
							headCells={headCells}
							numSelected={selected.length}
							selectBox={selectBox}
							order={order}
							orderBy={orderBy as string}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>
						<TableBody>
							{visibleRows.map((row) => {
								const isItemSelected = isSelected(row._id)
								const labelId = `enhanced-table-checkbox-${row._id}`

								return (
									<TableRow
										hover
										onClick={(event) => handleClick(event, row._id)}
										role='checkbox'
										aria-checked={isItemSelected}
										tabIndex={-1}
										key={row._id}
										selected={isItemSelected}
										sx={{ cursor: 'pointer' }}
									>
										{selectBox && (
											<TableCell padding='checkbox'>
												<Checkbox
													color='primary'
													checked={isItemSelected}
													inputProps={{
														'aria-labelledby': labelId
													}}
												/>
											</TableCell>
										)}

										{headCells.map((cell, index) => {
											if (index === 0) {
												return (
													<TableCell
														component='th'
														key={cell.id}
														id={labelId}
														scope='row'
														padding={selectBox ? 'none' : 'normal'}
													>
														{row[cell.id]}
													</TableCell>
												)
											}
											if (['checkInDate', 'checkOutDate'].includes(cell.id)) {
												return <TableCell key={cell.id}>{row[cell.id].toDateString()}</TableCell>
											}
											return <TableCell key={cell.id}>{row[cell.id]}</TableCell>
										})}
									</TableRow>
								)
							})}
							{emptyRows > 0 && (
								<TableRow
									style={{
										height: 53 * emptyRows
									}}
								>
									<TableCell colSpan={headCells.length + 1} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[10, 25]}
					component='div'
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Box>
	)
}

export default TableList
