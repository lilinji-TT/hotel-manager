import React from 'react'
import Toolbar from '@mui/material/Toolbar'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import { TableListToolbarProps } from '../../../domin/Table'
import { IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase'

const TableListToolbar: React.FC<TableListToolbarProps> = ({
	title,
	numSelected,
	children,
	search,
	handleSearchChange
}) => {
	return (
		<Toolbar
			sx={{
				pl: { sm: 3 },
				pr: { xs: 1, sm: 2 },
				...(numSelected > 0 && {
					bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
				})
			}}
		>
			{numSelected > 0 ? (
				<Typography sx={{ flex: '1 1 100%' }} color='inherit' variant='subtitle1' component='div'>
					{numSelected} 项记录被选择
				</Typography>
			) : (
				<Typography sx={{ flex: '1 1 100%' }} variant='h6' id='tableTitle' component='div'>
					{title}
				</Typography>
			)}
			<div className='mx-2'>{children}</div>
			{numSelected === 0 && (
				<Paper component='form' sx={{ p: '0 4px', display: 'flex', alignItems: 'center', width: 250 }}>
					<InputBase
						sx={{ ml: 1, flex: 1 }}
						placeholder='搜索'
						value={search}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							handleSearchChange(event.target.value)
						}}
						inputProps={{ 'aria-label': 'search' }}
					/>
					<IconButton type='button' sx={{ p: '7px' }} aria-label='search'>
						<SearchIcon />
					</IconButton>
				</Paper>
			)}
		</Toolbar>
	)
}

export default TableListToolbar
