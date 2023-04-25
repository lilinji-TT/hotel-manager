import 'bootstrap/dist/css/bootstrap.css'
import React, { ReactElement, useContext } from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import LoginPage from './components/authentication/login'
import ReisterPage from './components/authentication/register'
import ResetPasswordPage from './components/authentication/resetPassword'
import DashBoardPage from './components/dashBoard/dashboard'
import { UserContext } from './provider/UserProvider'

const App: React.FC = (): ReactElement => {
	const { userState } = useContext(UserContext)
	const unauthorizedRoutes = (
		<Routes>
			<Route path='/login' element={<LoginPage />} />
			<Route path='/register' element={<ReisterPage />} />
			<Route path='/reset-password' element={<ResetPasswordPage />} />
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
