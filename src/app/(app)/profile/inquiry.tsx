/* eslint-disable @typescript-eslint/no-explicit-any */
import { FlatList, StyleSheet, TextInput, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { FontAwesome, Ionicons } from '@expo/vector-icons'

import { ChatBubble, Row, Screen } from '@/components'
import images from '@/constants/images'
import { useThemeStore } from '@/stores/themeStore'
// import { SIZES } from '@/constants'
// import { formatChatTimestamp } from '@/utils/dateFormat'
const sampleMessages = [
	{
		text: 'Hi John, Let me know you need help and you can ask us any questions.',
		isSender: false,
		timestamp: '10:00am',
		userImage: images.logo, // Receiver image
	},
	{
		text: 'Hello, I need help?',
		isSender: true,
		timestamp: '10:05am',
		userImage: images.yusuf, // Sender image
	},
	{
		text: "Hi Yusuf, how can i help you",
		isSender: false,
		timestamp: '11:10am',
		userImage: images.logo, // Receiver image
	},
]
const InquiryScreen = () => {
	const theme = useThemeStore((s) => s.theme)
	const [messages, setMessages] = useState<any[]>(sampleMessages)
	const [message, setMessage] = useState('')
	const flatListRef = useRef<FlatList>(null)
	return (
		<Screen padded headerTitle="General Inquiry" showBackButton showHeader>
			<View style={styles.container}>
				<View style={styles.contents}>
					<FlatList
						ref={flatListRef}
						data={messages}
						renderItem={({ item }) => (
							<>
								<ChatBubble
									text={item.text}
									isSender={item.isSender}
									userImage={item.userImage} // Pass the image to the ChatBubble
									timestamp={item.timestamp} // Pass the timestamp to the ChatBubble
								/>
							</>
						)}
						keyExtractor={(item, index) => item.id + index.toString()}
						contentContainerStyle={styles.messageList}
					/>
				</View>
				<Row style={styles.bottom}>
					<FontAwesome name="camera" size={24} color={theme.tertiary} />
					<View style={{ width: '87%' }}>
						<TextInput value={message} onChangeText={setMessage} style={styles.input} />
						<Ionicons
							style={{ position: 'absolute', right: 20, top: '32%' }}
							name="send"
							size={24}
							color={theme.tertiary}
						/>
					</View>
				</Row>
			</View>
		</Screen>
	)
}

export default InquiryScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
	},
	contents: {
		flex: 1,
		// paddingBottom: 40,
		gap: 8,
		justifyContent:"flex-end",
		// alignItems:"flex-end"
		// flex
	},
	bottom: {
		alignItems: 'center',
		gap: 10,
		justifyContent: 'space-between',
		paddingTop: 10,
		borderTopWidth: 1,
		borderTopColor: '#ccc',
		position: 'relative',
	},
	input: {
		borderRadius: 26,
		height: 50,
		backgroundColor: '#ccc',
		marginVertical: 10,
	},
	messageList: {
		flexGrow: 1,
		justifyContent: 'flex-end',
		paddingBottom: 20,
	},
	timestamp: {
		textAlign: 'right',
		fontSize: 12,
		color: '#808080',
		marginTop: 4,
	},
})
