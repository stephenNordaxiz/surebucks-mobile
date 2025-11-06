/* eslint-disable @typescript-eslint/no-explicit-any */
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser'


export const openURL = (url: string) => {
	try {
		WebBrowser.openBrowserAsync(url)
	} catch (error: any) {
		console.log(error)
		alert('Unable to view website')
	}
}

// Validate if the string is a valid email format
export const validateEmail = (email: string): boolean => {
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
	return emailRegex.test(email)
}

// Validate if the name is valid (e.g., not empty and contains only letters and spaces)
export const validateName = (name: string): boolean => {
	const nameRegex = /^[A-Za-z\s]+$/
	return nameRegex.test(name) && name.length > 0
}

// Validate if the password is valid (e.g., minimum 8 characters, at least one letter, one number, and one special character)
export const validatePassword = (password: string): boolean => {
	const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
	return passwordRegex.test(password)
}

export const saveValueToStorage = (data: string, dataName: string) => {
	// Function to save the value in AsyncStorage
	if (data) {
		// To check the input not empty
		AsyncStorage.setItem(dataName, data)
		// Setting a data to a AsyncStorage with respect to a key
		console.log('Data Saved')
	} else {
		console.log('Please fill data')
	}
}
export const removeValueFromStorage = (dataName: string) => {
	// Function to save the value in AsyncStorage
	AsyncStorage.removeItem(dataName)
	// Setting a data to a AsyncStorage with respect to a key
	console.log('Data Removed')
}

export const getValueFromStorage = (dataName: string) => {
	// Function to get the value from AsyncStorage
	return AsyncStorage.getItem(dataName)
	// Setting the value in Text
}

export const saveObjectToStorage = async (data: any, dataName: string) => {
	try {
		await AsyncStorage.setItem(dataName, JSON.stringify(data))
	} catch (error) {
		console.log(error)
	}
}

// getting data
export const getObjectFromStorage = async (dataName: string) => {
	try {
		const val: any = AsyncStorage.getItem(dataName)
		return JSON.parse(await val)
	} catch (error) {
		console.log(error)
	}
}
export const fetchData = async (token: string, url: string) => {
	const headers = { authorization: `Bearer ${token}` } // auth header with bearer token
	const response = await fetch(url, { headers })
	const data = await response.json()
	return data
}

export const fetchCityData = async (state?: string) => {
	//since country is fixed
	//let country = 'NG'
	const url = `https://api.countrystatecity.in/v1/countries/NG/states/${state}/cities`
	const headers = {
		'Content-Type': 'application/json',
		'X-CSCAPI-KEY': 'SXdtaEZZaURzMkoxdExtOHFJM3lWUXIwb1E0OXROZmRad2psSWRybQ==',
	}

	try {
		const response = await fetch(url, { headers })
		const data = await response.json()
		return data
	} catch (error) {
		console.log(error)
		return `error occured while fetching ${state} states`
	}
}

export const fetchStateData = async () => {
	const headers = {
		'Content-Type': 'application/json',
		'X-CSCAPI-KEY': 'SXdtaEZZaURzMkoxdExtOHFJM3lWUXIwb1E0OXROZmRad2psSWRybQ==',
	}
	const url = 'https://api.countrystatecity.in/v1/countries/NG/states'

	try {
		const response = await fetch(url, { headers })
		const data = await response.json()
		return data
	} catch (error) {
		console.log(error)
		return `error occured while fetching states`
	}
}

export const nairaSymbol = (value: number | string, decimal?: number) => {
	const numericValue = Number(value) // Convert the value to number
	if (!numericValue) return '₦ 0.00'
	const negativeValue = numericValue * -1
	if (numericValue < 0)
		return (
			'-₦ ' +
			negativeValue.toLocaleString(undefined, {
				minimumFractionDigits: decimal,
				maximumFractionDigits: decimal,
			})
		)
	return '₦ ' + numericValue.toLocaleString(undefined, { minimumFractionDigits: decimal })
}
export const dollarSymbol = (value: number | string, decimal?: number) => {
	const numericValue = Number(value) // Convert the value to number
	if (!numericValue) return '$ 0.00'
	const negativeValue = numericValue * -1
	if (numericValue < 0)
		return (
			'-$ ' +
			negativeValue.toLocaleString(undefined, {
				minimumFractionDigits: decimal,
				maximumFractionDigits: decimal,
			})
		)
	return '$ ' + numericValue.toLocaleString(undefined, { minimumFractionDigits: decimal })
}

export const titleCase = (str: string) => {
	return str.toLowerCase().replace(/(^|\s)\S/g, (L) => L.toUpperCase())
}

export const validateOnlyNumbers = (value: any) => {
	const regex = /^[0-9]*$/
	const test = regex.test(value)
	return test
}

export const formatCardNumber = (str: string) => {
	let result = ''
	for (let i = 0; i < str.length; i++) {
		if (i > 0 && i % 4 === 0) {
			result += ' '
		}
		result += str[i]
	}
	return result
}

export const openLink = async (link: string) => {
	await Linking.openURL(link)
}

export const regexValidator = (value: string, type: string) => {
	if (type === 'uppercase') {
		if (value.length > 0 && value.match(/^[A-Z]*$/)) {
			return true
		} else {
			return false
		}
	}
	if (type === 'lowercase') {
		if (value.length > 0 && value.match(/^[a-z]*$/)) {
			return true
		} else {
			return false
		}
	}
	if (type === 'total' || type === 'length') {
		if (value.length >= 8) {
			return true
		} else {
			return false
		}
	}
}

const cleanPhoneNumber = (str: string) => {
	// just pretend that phone numbers only include +1 for the area code
	if (str.charAt(0) === '+' && str.charAt(1) === '1') {
		let newStr = ''
		for (let i = 2; i < str.length; i++) {
			newStr += str.charAt(i)
		}

		return newStr
	}

	return str
}

export const callPhoneNumber = (phoneNumber: string) => {
	Linking.openURL(`tel:${cleanPhoneNumber(phoneNumber)}`)
}
