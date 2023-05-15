import ky from 'ky'
import { checkCookieToken } from '~Api/checkCookieToken'

/** прокси с авторизацией */
const _ky = ky.extend({
	hooks: {
		beforeRequest: [
			request => {
				request.headers.set('Authorization', `${checkCookieToken()}`);
			}
		]
	}
})

export default _ky