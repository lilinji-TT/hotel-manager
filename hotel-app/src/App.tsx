import { useContext } from 'react'
import { UserContext } from './provider/UserProvider'
import 'bootstrap/dist/css/bootstrap.css'
import LoginPage from './components/login'

const App: React.FC = (): ReactElement => {
	const { userState } = useContext(UserContext)
	const unauthorizedRoutes = (
		<Routers>
			<Router path='/' render={() => <Redirect to={'/login'} />} />
			<Router path='/login' components={LoginPage} />
			<Router path='/register' components={LoginPage} />
			<Router path='/reset-password' components={LoginPage} />
		</Routers>
	)
	const authorizedRoutes = (
		<Routers>
			<Router path='/' />
		</Routers>
	)
}

export default App
