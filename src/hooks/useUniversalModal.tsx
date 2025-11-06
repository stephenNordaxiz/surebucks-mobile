import successIcon from '../assets/images/success.png'
import errorIcon from '../assets/images/error.png'
import pendingIcon from '../assets/images/failed.png'
import { useModalStore } from '@/stores/modalStore'

export const useUniversalModal = () => {
	const showModal = useModalStore.getState().showModal

	const showSuccess = (
		title: string,
		description: string,
		onConfirm?: () => void,
		confirmText = 'OK'
	) => {
		showModal({
			type: 'success',
			title,
			description,
			icon: successIcon,
			confirmText,
			showCancel: false,
			onConfirm,
		})
	}

	const showError = (
		title: string,
		description: string,
		onConfirm?: () => void,
		onCancel?: () => void,
		confirmText = 'Try Again',
		cancelText = 'Cancel'
	) => {
		showModal({
			type: 'error',
			title,
			description,
			icon: errorIcon,
			confirmText,
			cancelText,
			showCancel: !!onCancel,
			onConfirm,
			onCancel,
		})
	}

	const showPending = (
		title: string,
		description: string,
		confirmText = 'Dismiss',
		onConfirm?: () => void
	) => {
		showModal({
			type: 'pending',
			title,
			description,
			icon: pendingIcon,
			confirmText,
			showCancel: false,
			onConfirm,
		})
	}

	return {
		showSuccess,
		showError,
		showPending,
	}
}
