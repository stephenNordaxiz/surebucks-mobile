import AsyncStorage from '@react-native-async-storage/async-storage'
import { PersistStorage } from 'zustand/middleware'

export function createAsyncStorageAdapter<T>(): PersistStorage<T> {
	return {
		getItem: async (name) => {
			const value = await AsyncStorage.getItem(name)
			return value ? JSON.parse(value) : null
		},
		setItem: async (name, value) => {
			await AsyncStorage.setItem(name, JSON.stringify(value))
		},
		removeItem: async (name) => {
			await AsyncStorage.removeItem(name)
		},
	}
}

