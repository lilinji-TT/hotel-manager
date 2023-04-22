import { Role } from '../domin/User'

export const isRoles = (role: Role, lookup: Role) => {
	return role === lookup
}
