/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import * as DocumentPicker from 'expo-document-picker'
import * as FileSystem from 'expo-file-system'
import axios from 'axios'
import { AntDesign, Feather, SimpleLineIcons } from '@expo/vector-icons'

import { nav } from '@/utils/navigationService'
import {
	BasicInfo,
	CustomInput,
	CView,
	Demarcator,
	KYCWrapper,
	RoundedIcon,
	Row,
	Title,
} from '@/components'
import { useThemeStore } from '@/stores/themeStore'
import { COLORS } from '@/constants'
import { ThemeType } from '@/constants/theme'
import { useAuthStore } from '@/stores/authStore'

const DocUploadScreen = () => {
	const theme = useThemeStore((s) => s.theme)
	const styles = createStyles(theme)
	const [uploading, setUploading] = React.useState(false)
	const [uploadPercent, setUploadPercent] = useState(0)
	const [docType, setDocType] = useState('')
	const [docNumber, setDocNumber] = useState('')
	const [document, setDocument] = useState<any>()

    const { updateKyc, kyc } = useAuthStore()

	const docData = [
		{ id: 1, label: "Driver's License", value: "Driver's License" },
		{ id: 2, label: 'NIMC (NIN)', value: 'NIMC (NIN)' },
		{ id: 3, label: 'National ID Card', value: 'National ID Card' },
		{ id: 4, label: 'International Passport', value: 'International Passport' },
	]
	const handlePress = () => {
		try {
			setUploading(true)
			updateKyc({
				...kyc,
				doc: true,
			})
			nav('/kyc/photo')
		} catch (error: unknown) {
			console.log('error', error)
		} finally {
			setUploading(false)
		}
	}

	const uploadDocumentToServer = async (file: DocumentPicker.DocumentPickerAsset) => {
		setUploading(true)

		try {
			const fileUri = file.uri
			const fileInfo = await FileSystem.getInfoAsync(fileUri)
			console.log('fileInfo', fileInfo)
			const fileName = file.name || 'upload'
			const fileType = file.mimeType || 'application/octet-stream'

			const formData = new FormData()
			formData.append('file', {
				uri: fileUri,
				name: fileName,
				type: fileType,
			} as any) // `as any` needed for React Native FormData

			// Replace this with your API endpoint
			const uploadUrl = 'https://your-api.com/upload'

			const response = await axios.post(uploadUrl, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				onUploadProgress: (progressEvent) => {
					const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1))
					console.log(`Upload progress: ${percent}%`)
					setUploadPercent(percent)
				},
			})
			console.log('Upload response:', response.data)
			Alert.alert('Success', 'Document uploaded successfully!')
		} catch (err) {
			console.error('Upload failed:', err)
			Alert.alert('Error', 'Failed to upload document')
		} finally {
			setUploading(false)
		}
	}

	const handlePickDocument = async () => {
		try {
			const result = await DocumentPicker.getDocumentAsync({
				copyToCacheDirectory: true,
				type: '*/*', // or 'application/pdf', etc.
			})

			if (result.canceled || !result.assets?.[0]) {
				console.log('User cancelled or no file selected')
				return
			}

			const doc = result.assets[0]

			console.log('Picked document:', doc)
			setDocument(doc)
			await uploadDocumentToServer(doc)
		} catch (error) {
			console.error('Document pick error:', error)
		}
	}
	return (
		<KYCWrapper loading={uploading} onPress={handlePress} step={2} title="Upload Document">
			<View style={styles.container}>
				<BasicInfo />
				<View style={styles.content}>
				
						<CustomInput
							type="picker"
							label="Document Type"
							labelColor="black"
							pickerData={docData}
							placeholder="Select Document Type"
							onChangeText={setDocType}
							value={docType}
						/>
						<CustomInput
							type="default"
							label="Document Number"
							labelColor="black"
							placeholder="Document Number/Details"
							onChangeText={setDocNumber}
							value={docNumber}
						/>
						{docType && (
							<View style={styles.uploadContainer}>
								<Title text={'Upload Document'} textWeight={'500'} />
								<CView>
									<Title text={`Upload valid ${docType} that is not expired.`} />
									{document ? (
										<TouchableOpacity
											onPress={handlePickDocument}
											style={[
												styles.upload,
												{
													flexDirection: 'row',
													justifyContent: 'space-between',
													borderColor: theme.primary,
													alignItems: 'flex-start',
												},
											]}
										>
											<RoundedIcon
												icon={<Feather name="file-text" size={18} color={theme.primary} />}
											/>
											<View style={{ flex: 1, gap: 3 }}>
												<Title
													text={`sedrftgyhjkvccvgshgsffdgdg072nhnjjdn32n2nScreenshot.png`}
													onPress={() => setDocument(!document)}
													textColor={theme.tertiary}
												/>
												<Title text={`200Kb`} textColor={theme.subTitle} />
												<Row style={{ gap: 10, alignItems: 'center' }}>
													<Demarcator
														height={8}
														color={theme.primary}
														width={'85%'}
														style={{
															marginTop: 8,
														}}
													/>
													<Title
														text={uploadPercent > 0 ? `${uploadPercent}%` : `100%`}
														onPress={() => setDocument(!document)}
														textColor={theme.tertiary}
													/>
												</Row>
											</View>

											<AntDesign name="checkcircle" size={18} color={theme.primary} />
										</TouchableOpacity>
									) : (
										<TouchableOpacity
											style={
												document ? [styles.upload, { borderColor: theme.primary }] : styles.upload
											}
											onPress={handlePickDocument}
										>
											<RoundedIcon
												icon={<SimpleLineIcons name="cloud-upload" size={18} color="white" />}
											/>
											<Title
												onPress={() => setDocument(!document)}
												text={`Choose a file`}
												textColor={theme.primary}
											/>
											<Title text={`JPG, PNG, or PDF (max 5MB)`} textColor={theme.tertiary} />
										</TouchableOpacity>
									)}
								</CView>
							</View>
						)}
				
				</View>
			</View>
		</KYCWrapper>
	)
}

export default DocUploadScreen

function createStyles(theme: ThemeType) {
	return StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: 'space-between',
		},
		content: {
			marginTop: 16,
			gap: 16,
		},
		uploadContainer: {
			gap: 10,
		},
		main: {
			color: theme.icon,
		},
		upload: {
			alignItems: 'center',
			gap: 10,
			padding: 16,
			borderColor: COLORS.lightGray1,
			borderWidth: 1,
			borderRadius: 12,
			marginTop: 10,
		},
	})
}
