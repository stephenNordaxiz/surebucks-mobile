/* eslint-disable @typescript-eslint/no-explicit-any */
export const isWeakPin = (array: number[]): boolean => {
	if (array.length === 0) return false

	// Check if all digits are the same
	const allSame = array.every((num) => num === array[0])
	if (allSame) return true

	// Check if numbers are sequential (increasing)
	const isIncreasing = array.every((num, index) => {
		if (index === 0) return true
		return num === array[index - 1] + 1
	})

	// Check if numbers are sequential (decreasing)
	const isDecreasing = array.every((num, index) => {
		if (index === 0) return true
		return num === array[index - 1] - 1
	})

	return isIncreasing || isDecreasing
}
export function maskStringEnd(
	str: string,
	unmaskedLength: number = 4,
	maskChar: string = '*',
): string {
	if (str.length <= unmaskedLength) {
		return maskChar.repeat(str.length)
	}

	const visiblePart = str.slice(0, str.length - unmaskedLength)
	const maskedPart = maskChar.repeat(unmaskedLength)
	return visiblePart + maskedPart
}

export function getMontserratFontFamily(weight: string | number = '400', italic = false): string {
	const weightStr = String(weight)
	const fontMap: Record<string, string> = {
		'100': italic ? 'MontserratThinItalic' : 'MontserratThin',
		'200': italic ? 'MontserratExtraLightItalic' : 'MontserratExtraLight',
		'300': italic ? 'MontserratLightItalic' : 'MontserratLight',
		'400': italic ? 'Montserrat-Regular' : 'Montserrat-Regular', // Montserrat Regular is same for italic (unless you have it)
		'500': italic ? 'MontserratMediumItalic' : 'MontserratMedium',
		'600': italic ? 'MontserratSemiBoldItalic' : 'MontserratSemiBold',
		'700': italic ? 'MontserratBoldItalic' : 'MontserratBold',
		'800': italic ? 'MontserratExtraBoldItalic' : 'MontserratExtraBold',
		'900': italic ? 'MontserratBlackItalic' : 'MontserratBlack',
	}

	return fontMap[weightStr] || 'Montserrat-Regular' // fallback to regular
}

export function normalizePhoneNumber(phone: string, code: string) {
	const dialCode = code // country dial code

	return phone.startsWith('0') ? dialCode + phone.slice(1) : dialCode + phone
}
export function isValidPhoneNumber(input: string): boolean {
	const onlyDigits = /^\d+$/
	return onlyDigits.test(input) && input.length > 9
}
export function toLocalPhoneNumber(phone: string): string {
	// Remove non-digit characters like '+' or spaces
	phone = phone.replace(/\D/g, '')

	// If starts with '234' and is followed by 10 digits, convert to '0' + next 10 digits
	if (phone.startsWith('234') && phone.length === 13) {
		return '0' + phone.slice(3)
	}

	// If already in local format, return as is
	if (phone.length === 11 && phone.startsWith('0')) {
		return phone
	}

	// Fallback: return the original cleaned number
	return phone
}

export function formatToken(raw: string): string {
	// Remove "Token : " (with optional whitespace)
	const cleaned = raw.replace(/Token\s*:\s*/, '')

	// Insert "-" after every 4 digits
	return cleaned.replace(/(.{4})(?=.)/g, '$1-')
}
export function formatPhoneNumber(phone: any): string {
	if (!phone) return ''

	const match = phone.match(/^\+?(\d{3})(\d{3})(\d{3})(\d{4})?$/)
	if (!match) return phone

	// Format based on the number of groups found
	if (match[4]) {
		// If there's a fourth group (for longer numbers like in the US)
		return `+${match[1]} ${match[2]} ${match[3]} ${match[4]}`
	} else {
		return `+${match[1]} ${match[2]} ${match[3]}`
	}
}
export const hexToRgba = (hex: string, opacity: number) => {
	const cleanHex = hex.replace('#', '')
	const bigint = parseInt(cleanHex, 16)
	const r = (bigint >> 16) & 255
	const g = (bigint >> 8) & 255
	const b = bigint & 255
	return `rgba(${r}, ${g}, ${b}, ${opacity})`
}
export const generateUUID = (): string => {
	return 'xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
		const rand = (Math.random() * 16) | 0
		const value = char === 'x' ? rand : (rand & 0x3) | 0x8
		return value.toString(16)
	})
}
