/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'

type ModalType = 'success' | 'error' | 'pending'

type ModalOptions = {
	type?: ModalType
	title?: string
	description?: string
	icon?: any
	confirmText?: string
	cancelText?: string
	onConfirm?: () => void
	onCancel?: () => void
	showCancel?: boolean
}

type ModalState = {
	visible: boolean
	options: ModalOptions
	showModal: (options: ModalOptions) => void
	hideModal: () => void
}

export const useModalStore = create<ModalState>((set) => ({
	visible: false,
	options: {},
	showModal: (options) => set({ visible: true, options }),
	hideModal: () => set({ visible: false, options: {} }),
}))
