import { Modal } from 'react-native'
import React, { ReactNode } from 'react'

const ModalView = ({
	modalVisible,
	transparent,
	children,
}: {
	modalVisible: boolean
	transparent?: boolean
	children: ReactNode
}) => {
	return (
		<Modal animationType={'slide'} transparent={transparent} visible={modalVisible}>
			{children}
		</Modal>
	)
}

export default ModalView
