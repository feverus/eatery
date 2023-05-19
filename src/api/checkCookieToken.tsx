import setStore from "~Store/setStore"

export const checkCookieToken = () => {
	if (setStore.token!=='')
		return setStore.token

	let answer = '', cookie
	if (document.cookie.length > 0) {
		let cookies = document.cookie.split(';');
		for (let i = 0, len = cookies.length; i < len; i++) {
			cookie = cookies[i].split('=')
			if (cookie[0].trim() === 'token')
				answer = cookie[1].trim()
		}
	}

	return answer
}