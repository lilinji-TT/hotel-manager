import React, { useState, useContext } from 'react'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Badge from '@mui/material/Badge'
import Container from '@mui/material/Container'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import LogoutIcon from '@mui/icons-material/Logout'
import { MainListItems, SecondaryListItems } from './navItems'
import { Route, Routes } from 'react-router-dom'
import ManagePage from './manage/manage'
import RecordPage from './record/record'
import UsersPage from './users/users'
import RoomPage from './room/room'
import Toolbar from '@mui/material/Toolbar/Toolbar'
import IconButton from '@mui/material/IconButton/IconButton'
import Typography from '@mui/material/Typography/Typography'
import Divider from '@mui/material/Divider/Divider'
import List from '@mui/material/List/List'
import { UserContext } from '../provider/UserProvider'
import { Role } from '../domin/User'
import { useDialog } from '../hooks/useDialog'

interface AppBarProps extends MuiAppBarProps {
	open?: boolean
}

const drawerWidth = 240
const mdTheme = createTheme()

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	})
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
	'& .MuiDrawer-paper': {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		}),
		boxSizing: 'border-box',
		...(!open && {
			overflowX: 'hidden',
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen
			}),
			width: theme.spacing(7),
			[theme.breakpoints.up('sm')]: {
				width: theme.spacing(9)
			}
		})
	}
}))

const DashboardContent: React.FC = () => {
	const [open, setOpen] = useState(true)
	const { userState } = useContext(UserContext)
	const { showMessage, Dialog } = useDialog()
	const toggleDrawer = () => {
		showMessage({ content: '成功！', duration: 3000, type: 'info' })
		setOpen(!open)
	}

	return (
		<ThemeProvider theme={mdTheme}>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<AppBar position='absolute' open={open}>
					<Toolbar
						sx={{
							pr: '24px' // keep right padding when drawer closed
						}}
					>
						<IconButton
							edge='start'
							color='inherit'
							aria-label='open drawer'
							onClick={toggleDrawer}
							sx={{
								marginRight: '36px',
								...(open && { display: 'none' })
							}}
						>
							<MenuIcon />
						</IconButton>
						<Typography component='h1' variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
							酒店易管家
						</Typography>
						<IconButton color='inherit'>
							<Badge color='secondary'>
								<LogoutIcon />
							</Badge>
						</IconButton>
					</Toolbar>
				</AppBar>
				<Drawer variant='permanent' open={open}>
					<Toolbar
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'flex-end',
							px: [1]
						}}
					>
						<IconButton onClick={toggleDrawer}>
							<ChevronLeftIcon />
						</IconButton>
					</Toolbar>
					<Divider />
					<List component='nav'>
						<MainListItems />
						<Divider sx={{ my: 1 }} />
						{SecondaryListItems}
					</List>
				</Drawer>
				<Box
					component='main'
					sx={{
						backgroundColor: (theme) =>
							theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
						flexGrow: 1,
						height: '100vh',
						overflow: 'auto'
					}}
				>
					<Toolbar />
					<Container maxWidth='xl' sx={{ mt: 2, mb: 2 }}>
						<Routes>
							{userState.role === Role.ADMIN ? (
								<Route path='/users' element={<UsersPage />} />
							) : (
								<Route path='/manage' element={<ManagePage />} />
							)}
							<Route path='/room' element={<RoomPage />} />
							<Route path='/record' element={<RecordPage />} />
						</Routes>
					</Container>
				</Box>
			</Box>
			<Dialog />
		</ThemeProvider>
	)
}

export default DashboardContent
