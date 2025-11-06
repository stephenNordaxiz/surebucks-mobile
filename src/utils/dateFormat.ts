/* eslint-disable @typescript-eslint/no-explicit-any */
export const formatChatTimestamp = (timestamp: any) => {
	const date = new Date(timestamp)
	const now = new Date()

	// const isToday = date.toDateString() === now.toDateString();
	const isToday = date.toDateString() === now.toDateString()
	// console.log(date?.toDateString())
	const yesterday = new Date()
	// console.log()
	yesterday.setDate(now.getDate() - 1)
	const isYesterday = date.toDateString() === yesterday.toDateString()

	const hours = date.getHours()
	const minutes = date.getMinutes()
	const ampm = hours >= 12 ? 'PM' : 'AM'
	const hour12 = hours % 12 || 12 // Convert to 12-hour format
	const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes

	const timeString = `${hour12}:${paddedMinutes} ${ampm}`

	if (isToday) {
		return timeString // Example: "4:30 PM"
	} else if (isYesterday) {
		return `Yesterday at ${timeString}` // Example: "Yesterday at 3:45 PM"
	} else {
		const monthNames = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		]
		const month = monthNames[date.getMonth()]
		const day = date.getDate()
		const year = date.getFullYear()

		return `${month} ${day}, ${year} at ${timeString}` // Example: "April 25, 2025 at 2:00 PM"
	}
}

export const formatDate = (rawDate: Date) => {
	const date = new Date(rawDate)
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const realDay = day < 10 ? `0${day}` : day
	const realMonth = day < 10 ? `0${month}` : month
	return `${realMonth}-${realDay}-${year}`
}
export const formatDateCard = (rawDate: Date) => {
	const date = new Date(rawDate)
	const month = date.getMonth() + 1
	const day = date.getDate()
	const realDay = day < 10 ? `0${day}` : day
	const realMonth = month < 10 ? `0` + month : month
	return `${realMonth}/ ${realDay}`
}

export const formatDateString = (rawDate: any, time?: boolean) => {
	const options = {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	} as any
	const date = new Date(rawDate)
	const test = Date.now()
	const today = new Date(test)
	if (time) return date.toLocaleDateString('en-GB', options) + ' ' + formatAMPM(date)
	if (today.toLocaleDateString('en-GB', options) === date.toLocaleDateString('en-GB', options))
		return 'Today'
	return date.toLocaleDateString('en-GB', options)
}
const formatAMPM = (date: any) => {
	let hours = date.getHours()
	let minutes = date.getMinutes()
	const ampm = hours >= 12 ? 'PM' : 'AM'

	hours %= 12
	hours = hours || 12
	minutes = minutes < 10 ? `0${minutes}` : minutes

	const strTime = `${hours}:${minutes} ${ampm}`

	return strTime
}

export const formatDateTime = (
	dateInput: string | Date,
	format: 'DD/MM/YYYY' | 'YYYY-MM-DD' | 'DD MMM YYYY' = 'DD/MM/YYYY',
	includeTime: boolean = false,
	use24Hour: boolean = false,
): string => {
	const date = new Date(dateInput)

	const day = String(date.getDate()).padStart(2, '0')
	const monthNum = String(date.getMonth() + 1).padStart(2, '0')
	const year = date.getFullYear()

	const monthNames = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	]
	const monthStr = monthNames[date.getMonth()]

	let formattedDate = ''

	switch (format) {
		case 'YYYY-MM-DD':
			formattedDate = `${year}-${monthNum}-${day}`
			break
		case 'DD MMM YYYY':
			formattedDate = `${day} ${monthStr} ${year}`
			break
		case 'DD/MM/YYYY':
		default:
			formattedDate = `${day}/${monthNum}/${year}`
			break
	}

	if (includeTime) {
		const hours = date.getHours()
		const minutes = String(date.getMinutes()).padStart(2, '0')

		let timeString = ''

		if (use24Hour) {
			const hourStr = String(hours).padStart(2, '0')
			timeString = `${hourStr}:${minutes}`
		} else {
			const ampm = hours >= 12 ? 'PM' : 'AM'
			const hour12 = hours % 12 || 12
			const hourStr = String(hour12).padStart(2, '0')
			timeString = `${hourStr}:${minutes} ${ampm}`
		}

		formattedDate += `, ${timeString}`
	}

	return formattedDate
}

export const greeting = () => {
	const now = new Date()
	const hours = now.getHours()

	const greetingText =
		hours < 12 ? 'Good Morning!' : hours < 18 ? 'Good Afternoon!' : 'Good Evening!'
	return greetingText
}

export function formatNotificationDateTime(input: string): string {
	const date = new Date(input)

	const now = new Date()
	const isToday =
		date.getDate() === now.getDate() &&
		date.getMonth() === now.getMonth() &&
		date.getFullYear() === now.getFullYear()

	const hours = date.getHours()
	const minutes = date.getMinutes()
	const ampm = hours >= 12 ? 'pm' : 'am'
	const formattedHours = hours % 12 || 12
	const formattedMinutes = minutes.toString().padStart(2, '0')
	const time = `${formattedHours}:${formattedMinutes}${ampm}`

	if (isToday) {
		return `${time} Today`
	}

	const options: Intl.DateTimeFormatOptions = {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	}
	const formattedDate = date.toLocaleDateString('en-US', options)
	return `${time} - ${formattedDate}`
}
export const addDurationToDate = (duration: string, baseDate = new Date()): Date => {
  const cleaned = duration.trim().toLowerCase()
  const regex = /^(\d+)\s*(day|week|month|year)s?$/i
  const match = cleaned.match(regex)

  if (!match) {
    throw new Error(`Invalid duration format: "${duration}"`)
  }

  const value = parseInt(match[1], 10)
  const unit = match[2]

  const result = new Date(baseDate)

  switch (unit) {
    case 'day':
      result.setDate(result.getDate() + value)
      break
    case 'week':
      result.setDate(result.getDate() + value * 7)
      break
    case 'month':
      result.setMonth(result.getMonth() + value)
      break
    case 'year':
      result.setFullYear(result.getFullYear() + value)
      break
    default:
      throw new Error(`Unsupported duration unit: "${unit}"`)
  }

  return result
}


export const getFixedDate = (): Date => {
	return new Date(`${Date.now()}`)
}
