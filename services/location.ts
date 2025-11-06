import { CONFIG } from '@/constants'
import { Location } from '@/types/locationIQ'
import axios from 'axios'

export const getSuggestedLocations = async (text: string, limit?: number) => {
	try {
		let finalLimit = 8
		if (limit) finalLimit = limit
		const url = `${CONFIG.endpoints.autoComplete}?location=${text}&limit=${finalLimit}`
		const { data } = await axios.get<Location[]>(url)
		if (data) return data
		return []
	} catch (error) {
		console.log(error)
		return []
	}
}

export const searchLocations = async (text: string) => {
	try {
		const url = `${CONFIG.endpoints.search}?query=${text}&format=json`
		const { data } = await axios.get<Location[]>(url)
		if (data) return data

		return []
	} catch (error) {
		console.log(error)
		return []
	}
}
// 0230989148
