import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { UserContext } from './provider/UserProvider'
import 'bootstrap/dist/css/bootstrap.css'
import DashBoardPage from './components/dashBoard/dashboard'
import LoginPage from './components/authentication/login'

const App: React.FC = (): ReactElement => {
	const { userState } = useContext(UserContext)
	const unauthorizedRoutes = (
		<Route>
			<Route path='/login' element={LoginPage} />
			<Route path='/register' element={LoginPage} />
			<Route path='/reset-password' element={LoginPage} />
			<Route path='*' element={<Navigate to='/login' replace />} />
		</Route>
	)
	const authorizedRoutes = (
		<Route>
			<Route path='/' element={DashBoardPage} />
			<Route path='/login' element={<Navigate to='/' replace />} />
		</Route>
	)
	if (!userState) return <>出错了</>
	return <Routes>{userState.isAuthenticated ? authorizedRoutes : unauthorizedRoutes}</Routes>
}

export default App
