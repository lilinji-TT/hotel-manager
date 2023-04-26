import React, { useContext } from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AssignmentIcon from '@mui/icons-material/Assignment'
import HomeSharpIcon from '@mui/icons-material/HomeSharp'
import ManageHistorySharpIcon from '@mui/icons-material/ManageHistorySharp'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../provider/UserProvider'
import { Role } from '../domin/User'

export const MainListItems: React.FC = () => {
	const { userState } = useContext(UserContext)
	return (
		<React.Fragment>
			<NavLink to={'/chart'} className={'text-decoration-none text-reset border-0'}>
				<ListItemButton>
					<ListItemIcon>
						<DashboardIcon />
					</ListItemIcon>
					<ListItemText primary='数据信息' />
				</ListItemButton>
			</NavLink>
			{userState.role === Role.ADMIN && (
				<NavLink to={'/users'} className={'text-decoration-none text-reset border-0'}>
					<ListItemButton>
						<ListItemIcon>
							<ManageAccountsIcon />
						</ListItemIcon>
						<ListItemText primary='员工列表' />
					</ListItemButton>
				</NavLink>
			)}
			<NavLink to={'/room'} className={'text-decoration-none text-reset border-0'}>
				<ListItemButton>
					<ListItemIcon>
						<HomeSharpIcon />
					</ListItemIcon>
					<ListItemText primary='房间管理' />
				</ListItemButton>
			</NavLink>
			{userState.role === Role.REGULAR && (
				<NavLink to={'/manage'} className={'text-decoration-none text-reset border-0'}>
					<ListItemButton>
						<ListItemIcon>
							<ManageHistorySharpIcon />
						</ListItemIcon>
						<ListItemText primary='入住管理' />
					</ListItemButton>
				</NavLink>
			)}
		</React.Fragment>
	)
}

export const SecondaryListItems = (
	<React.Fragment>
		<NavLink to={'/record'} className={'text-decoration-none text-reset border-0'}>
			<ListItemButton>
				<ListItemIcon>
					<AssignmentIcon />
				</ListItemIcon>
				<ListItemText primary='订单记录' />
			</ListItemButton>
		</NavLink>
	</React.Fragment>
)
