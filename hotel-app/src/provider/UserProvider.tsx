import { ReactNode, createContext, useCallback, useMemo, useReducer } from 'react'
import { Role, UserWithAuth } from '../domin/User.ts'
import { ss } from '../utils/storage/index.ts'
import { userActions } from './actions/useUserAction.ts'

const USER_STATE = {
	_id: '',
	userName: '',
	realName: '',
	role: Role.REGULAR,
	isAuthenticated: false
}

export const UserContext = createContext({})

const UserProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {
	const defaultUserState: UserWithAuth = ss.get('USER_STATE') || USER_STATE

	const userReducer = useCallback(
		(state: UserWithAuth = defaultUserState, action) => {
			switch (action.type) {
				case 'SET_LOGIN_STATE':
					return userActions.userLogin(state, action)
				default:
					return state
			}
		},
		[defaultUserState]
	)

	const [userState, userDispatch] = useReducer(userReducer, ss.get('USER_STATE') || USER_STATE)
	const value = useMemo(() => ({ userState, userDispatch }), [userState, userDispatch])
	return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserProvider
