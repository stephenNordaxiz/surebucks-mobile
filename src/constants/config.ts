const liveURL = 'https://api.direkta.africa'
const devURL = 'https://api-sandbox.direkta.africa'
const fundURL = 'https://api-sandbox.direkta.africa/wallet/fund'
const serverUrl = 'http://192.168.43.241:5000/api'
const location = '/location'
const users = '/users'
const userEndpoint = serverUrl + users
const locationEndpoint = serverUrl + location

const endpoints = {
	autoComplete: locationEndpoint + '/autocomplete',
	search: locationEndpoint + '/search',
	login: userEndpoint + '/login',
	register: userEndpoint + '/register',
	forgotPassword: userEndpoint + '/forgot-password',
}
export default {
	endpoints,
	liveURL,
	devURL,
	fundURL,
}
