import React, { ReactElement, useContext } from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import LoginPage from './components/authentication/login'
import DashBoardPage from './components/dashboard'
import { UserContext } from './provider/UserProvider'

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
			<Route path='/*' element={<DashBoardPage />} />
			<Route path='/' element={<Navigate to='/chart' replace />} />
			<Route path='/login' element={<Navigate to='/' replace />} />
		</Routes>
	)
	if (!userState) return <>出错了</>
	return <Router>{!userState.isAuthenticated ? authorizedRoutes : unauthorizedRoutes}</Router>
}

export default App
