import { useModalStore } from '@/stores/modalStore'
import React from 'react'
import { Modal, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'

const typeColors = {
	success: '#4CAF50',
	error: '#D91515',
	pending: '#FF9800',
	default: '#4CAF50',
}

const UniversalModal = () => {
	const { visible, options, hideModal } = useModalStore()

	const {
		title,
		description,
		icon,
		onConfirm,
		onCancel,
		confirmText = 'OK',
		cancelText = 'Cancel',
		showCancel = false,
		type = 'success',
	} = options

	const confirmColor = typeColors[type] || typeColors.default

	return (
		<Modal transparent visible={visible} animationType="fade">
			<View style={styles.backdrop}>
				<View style={styles.modal}>
					{icon && <Image source={icon} style={styles.icon} resizeMode="contain" />}
					{title && <Text style={styles.title}>{title}</Text>}
					{description && <Text style={styles.description}>{description}</Text>}

					<View style={styles.buttonRow}>
						{showCancel && (
							<TouchableOpacity
								style={[styles.button, styles.cancel]}
								onPress={() => {
									onCancel?.()
									hideModal()
								}}
							>
								<Text style={[styles.buttonText, styles.cancelText]}>{cancelText}</Text>
							</TouchableOpacity>
						)}
						<TouchableOpacity
							style={[styles.button, { backgroundColor: confirmColor }]}
							onPress={() => {
								onConfirm?.()
								hideModal()
							}}
						>
							<Text style={styles.buttonText}>{confirmText}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	backdrop: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modal: {
		width: 270,
		backgroundColor: 'white',
		borderRadius: 12,
		padding: 20,
		alignItems: 'center',
	},
	icon: {
		width: 40,
		height: 40,
		marginBottom: 10,
	},
	title: {
		fontSize: 18,
		fontWeight: '600',
		textAlign: 'center',
		marginBottom: 8,
	},
	description: {
		fontSize: 14,
		textAlign: 'center',
		color: '#666',
		marginBottom: 20,
	},
	buttonRow: {
		flexDirection: 'row',
		gap: 10,
	},
	button: {
		flex: 1,
		paddingVertical: 10,
		borderRadius: 6,
		alignItems: 'center',
	},
	cancel: {
		backgroundColor: '#E0E0E0',
	},
	cancelText: {
		color: '#333',
	},
	buttonText: {
		color: '#fff',
		fontWeight: '600',
	},
})

export default UniversalModal
