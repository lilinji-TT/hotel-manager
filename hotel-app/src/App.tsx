import React, { ReactElement, useContext } from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import { UserContext } from './provider/UserProvider'
import 'bootstrap/dist/css/bootstrap.css'
import DashBoardPage from './components/dashBoard/dashboard'
import LoginPage from './components/authentication/login'

const App: React.FC = (): ReactElement => {
	const { userState } = useContext(UserContext)
	const unauthorizedRoutes = (
		<Routes>
			<Route path='/login' element={<LoginPage />} />
			<Route path='/register' element={<LoginPage />} />
			<Route path='/reset-password' element={<LoginPage />} />
			<Route path='*' element={<Navigate to='/login' replace />} />
		</Routes>
	)
	const authorizedRoutes = (
		<Routes>
			<Route path='/' element={<DashBoardPage />} />
			<Route path='/login' element={<Navigate to='/' replace />} />
		</Routes>
	)
	if (!userState) return <>出错了</>
	return <Router>{userState.isAuthenticated ? authorizedRoutes : unauthorizedRoutes}</Router>
}

export default App
