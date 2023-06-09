import { UserState } from '../../domin/User'
import { ss } from '../../utils/storage'

export const userActions = {
	userLogin: (state: UserState, action) => {
		const user_login_state = { ...state, ...action.payload, isAuthenticated: true }
		ss.set('USER_STATE', user_login_state)
		return user_login_state
	}
}
