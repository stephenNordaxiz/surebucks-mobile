/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

import { getMontserratFontFamily, hexToRgba } from '@/utils/checker'
import { useThemeStore } from '@/stores/themeStore'
import { ThemeType } from '@/constants/theme'

interface ChatBubbleProps {
	text: string
	isSender: boolean
	userImage: any
	timestamp?: any // Add timestamp as a prop
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ text, isSender, userImage, timestamp }) => {
	const currentTheme = useThemeStore((s) => s.theme)
	const styles = createStyles(currentTheme)

	return (
		<View style={styles.container}>
			<View style={[styles.messageContainer, isSender ? styles.sender : styles.receiver]}>
				<View style={styles.imageContainer}>
					<Image source={userImage} style={styles.userImage} />
				</View>
				<View>
					<View style={[styles.bubble, isSender ? styles.senderBubble : styles.receiverBubble]}>
						<Text
							style={
								isSender
									? [styles.text, { color: hexToRgba(currentTheme.tertiary, 0.6) }]
									: styles.text
							}
						>
							{text}
						</Text>
					</View>
					<Text
						style={
							isSender
								? [
										styles.timestamp,
										{
											textAlign: 'right',
										},
									]
								: styles.timestamp
						}
					>
						{timestamp}
					</Text>
				</View>
			</View>
		</View>
	)
}

export default ChatBubble

function createStyles(theme: ThemeType) {
	return StyleSheet.create({
		container: {},
		messageContainer: {
			flexDirection: 'row',
			marginBottom: 10,
			maxWidth: '80%',
		},
		sender: {
			alignSelf: 'flex-end',
			flexDirection: 'row-reverse',
		},
		receiver: {
			alignSelf: 'flex-start',
			flexDirection: 'row',
		},
		imageContainer: {
			marginHorizontal: 10,
			backgroundColor: theme.primary,
			width: 40,
			height: 40,
			borderRadius: 20,
			alignItems: 'center',
			justifyContent: 'center',
		},
		userImage: {
			width: 35,
			height: 35,
			borderRadius: 20,
			resizeMode: 'contain',
		},
		bubble: {
			borderRadius: 16,
			padding: 16,
		},
		senderBubble: {
			backgroundColor: hexToRgba(theme.primary, 0.2),
      maxWidth: '100%',
		},
		receiverBubble: {
      maxWidth: '90%',
			backgroundColor: hexToRgba(theme.secondary, 0.2),
		},
		text: {
			color: 'black',
			fontSize: 10,
			fontFamily: getMontserratFontFamily('400'),
		},
		timestamp: {
			fontFamily: getMontserratFontFamily('300'),
			fontSize: 8,
			color: '#757575',
			marginTop: 5,
		},
	})
}
