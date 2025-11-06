import React, { ReactNode } from 'react'
import { Modal, View, Text, StyleSheet } from 'react-native'

type SimpleModalProps = {
	visible: boolean
	title?: string
	children?: ReactNode
	description?: string
	// onCancel: () => void
	// onConfirm: () => void
}

const SimpleModal = ({
	children,
	visible,
	title,
	description,
	// onCancel,
	// onConfirm,
}: SimpleModalProps) => {
	return (
		<Modal visible={visible} transparent animationType="fade">
			<View style={styles.backdrop}>
				<View style={styles.container}>
					{title && <Text style={styles.title}>{title}</Text>}
					{description && <Text style={styles.description}>{description}</Text>}
					<View style={styles.content}>{children}</View>
					{/* <View style={styles.buttonRow}>
						<TouchableOpacity style={[styles.button, styles.cancel]} onPress={onCancel}>
							<Text style={styles.buttonText}>Cancel</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[styles.button, styles.confirm]} onPress={onConfirm}>
							<Text style={styles.buttonText}>OK</Text>
						</TouchableOpacity>
					</View> */}
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
	container: {
		width: 270,
		backgroundColor: 'white',
		borderRadius: 12,
		paddingTop: 20,
		alignItems: 'center',
		elevation: 5,
	},
	content: {
		// marginBottom: 20,
	},
	title: {
		fontSize: 18,
		fontWeight: '600',
		marginBottom: 10,
		textAlign: 'center',
	},
	description: {
		fontSize: 14,
		color: '#555',
		textAlign: 'center',
		marginBottom: 20,
	},
	buttonRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 10,
	},
	button: {
		flex: 1,
		paddingVertical: 10,
		borderRadius: 6,
		alignItems: 'center',
	},
	cancel: {
		backgroundColor: '#ccc',
	},
	confirm: {
		backgroundColor: '#4CAF50',
	},
	buttonText: {
		color: 'white',
		fontWeight: '600',
	},
})

export default SimpleModal
