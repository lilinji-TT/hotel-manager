import React, { useReducer, ReactNode } from 'react'
import { Role, UserWithAuth } from '../domin/user.ts'
const defaultUserState: UserWithAuth = {
	_id: '',
	userName: '',
	realName: '',
	role: Role.User,
	isAuthenticated: false
}

const userReducer = (state = defaultUserState, action = {}) => {
	switch (action.type) {
		case 'userLogin':
			return userLogin(state, action)
			break
		default:
			return state
	}
}

const userLogin = (state: User, action) => {
	return { ...state, userName: action.userName, isAuthenticated: true }
}

export const UserContext = createContext(null)

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [userState, userDispatch] = useReducer(userReducer, defaultUserState)
	return <UserContext.Provider value={{ userState, userDispatch }}>{children}</UserContext.Provider>
}
