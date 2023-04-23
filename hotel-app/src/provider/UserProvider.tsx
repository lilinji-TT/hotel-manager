import { ReactNode, createContext, useReducer } from 'react'
import { Role, User, UserWithAuth } from '../domin/User.ts'
const defaultUserState: UserWithAuth = {
	_id: '',
	userName: '',
	realName: '',
	role: Role.REGULAR,
	isAuthenticated: false
}

const userReducer = (state: UserWithAuth = defaultUserState, action) => {
	switch (action.type) {
		case 'userLogin':
			return userLogin(state, action)
		default:
			return state
	}
}

const userLogin = (state: User, action) => {
	return { ...state, userName: action.userName, isAuthenticated: true }
}

export const UserContext = createContext({})

const UserProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {
	const [userState, userDispatch] = useReducer(userReducer, defaultUserState)
	return <UserContext.Provider value={{ userState, userDispatch }}>{children}</UserContext.Provider>
}

export default UserProvider
