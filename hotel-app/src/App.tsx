import 'bootstrap/dist/css/bootstrap.css'
import React, { ReactElement, useContext } from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import LoginPage from './components/authentication/login'
import DashBoardPage from './components/dashBoard/dashboard'
import { UserContext } from './provider/UserProvider'

const App: React.FC = (): ReactElement => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const { userState } = useContext(UserContext) as any
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
