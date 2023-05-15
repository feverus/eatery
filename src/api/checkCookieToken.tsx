export const checkCookieToken = () => {
	let answer = '', cookie;
	if (document.cookie.length > 0) {
		let cookies = document.cookie.split(';');
		for (let i = 0, len = cookies.length; i < len; i++) {
			cookie = cookies[i].split('=');
			if (cookie[0].trim() === 'token')
				answer = cookie[1].trim();
		}
	}
	
	console.log('cookie token: ' + answer)

	return answer
}