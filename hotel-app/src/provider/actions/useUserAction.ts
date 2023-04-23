import { User } from '../../domin/User'
import { ss } from '../../utils/storage'

export const userActions = {
	userLogin: (state: User, action) => {
		const user_login_state = { ...state, userName: action.userName, isAuthenticated: true }
		ss.set('USER_STATE', user_login_state)
		return user_login_state
	}
}
