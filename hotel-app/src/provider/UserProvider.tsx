import { ReactNode, createContext, useCallback, useMemo, useReducer } from 'react'
import { Role, UserState, UserStateWithAuth } from '../domin/User.ts'
import { ss } from '../utils/storage/index.ts'
import { userActions } from './actions/useUserAction.ts'

export interface USER_STATE {
	userState: UserStateWithAuth
	userDispatch: React.Dispatch<{ type: string } | UserState>
}

const USER_STATE: UserStateWithAuth = {
	_id: '',
	userName: '',
	realName: '',
	role: Role.REGULAR,
	isAuthenticated: false
}

export const UserContext = createContext<USER_STATE>({} as USER_STATE)

const UserProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {
	const defaultUserState: UserStateWithAuth = ss.get('USER_STATE') || USER_STATE

	const userReducer = useCallback(
		(state: UserStateWithAuth = defaultUserState, action) => {
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
