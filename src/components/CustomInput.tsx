/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import CountryFlag from 'react-native-country-flag'
import {
	TextInput,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Pressable,
	Image,
	FlatList,
	Alert,
	ScrollView,
} from 'react-native'
import {
	AntDesign,
	FontAwesome6,
	Ionicons,
	MaterialIcons,
	MaterialCommunityIcons,
} from '@expo/vector-icons'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

import { validateEmail, validateName, validatePassword } from '@/utils'

import CustomModal from './CustomModal'
import Title from './Title'
import Row from './Row'
import Demarcator from './Demarcator'
import { getMontserratFontFamily, hexToRgba } from '@/utils/checker'
import { isValidPhoneNumber } from '@/utils/getCountry'
import { SIZES } from '@/constants'
import { countryList } from '../assets/data/countries'
import { useThemeStore } from '@/stores/themeStore'
import { formatDateString } from '@/utils/dateFormat'

interface CustomInputFieldProps {
	label: string
	value: string
	onChangeText: (text: any) => void
	type:
		| 'phone'
		| 'bvn'
		| 'account'
		| 'email'
		| 'name'
		| 'password'
		| 'password2'
		| 'date'
		| 'picker'
		| 'default' // Type of validation
	placeholder: string
	flagEditable?: boolean
	keyboardTpe?:
		| 'default'
		| 'numeric'
		| 'email-address'
		| 'ascii-capable'
		| 'numbers-and-punctuation'
		| 'url'
		| 'number-pad'
		| 'phone-pad'
		| 'name-phone-pad'
		| 'decimal-pad'
		| 'twitter'
		| 'web-search'
		| 'visible-password'
	secureTextEntry?: boolean // For password fields
	labelColor?: string
	err?: string
	editable?: boolean // For password fields
	phoneInput?: any
	pickerData?: any[]
	onDialCodeChange?: (dialCode: any) => void
}
const measureTextWidth = (text: string, fontSize = 14): number => {
	const averageCharWidth = fontSize * 0.5 // Approximation
	return text.length * averageCharWidth
}

const CInputField: React.FC<CustomInputFieldProps> = ({
	label,
	labelColor,
	value,
	onChangeText,
	type,
	placeholder,
	secureTextEntry = false,
	phoneInput,
	editable = true,
	pickerData,
	onDialCodeChange,
	flagEditable = true,
	keyboardTpe,
	err,
}) => {
	const [isFocused, setIsFocused] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [adjustedPlaceholder, setAdjustedPlaceholder] = useState(placeholder)
	const fontSize = 16
	const maxWidth = SIZES.width - 40
	useEffect(() => {
		if (err) {
			setErrorMessage(err)
		}
	}, [err])

	useEffect(() => {
		const truncateIfNeeded = () => {
			const width = measureTextWidth(placeholder, fontSize)
			if (width > maxWidth) {
				// Approximate max chars that fit
				const maxChars = Math.floor(maxWidth / (fontSize * 0.5)) - 3
				setAdjustedPlaceholder(placeholder.substring(0, maxChars) + '...')
			}
		}
		truncateIfNeeded()
	}, [placeholder, fontSize, maxWidth])
	// const [placeHolder] = useState(placeholder);
	const [showPassword, setShowPassword] = useState(secureTextEntry) // Track password visibility
	const currentTheme = useThemeStore((s) => s.theme) // Directly get the theme from Redux

	useEffect(() => {
		if (type === 'password' || type === 'password2') setShowPassword(true)
	}, [type])

	// Validation function based on the type
	const validateInput = () => {
		let isValid = true
		switch (type) {
			case 'email':
				if (!validateEmail(value)) {
					setErrorMessage('Please enter a valid email.')
					isValid = false
				}
				break
			case 'name':
				if (!validateName(value)) {
					setErrorMessage('Please enter a valid name (only letters and spaces).')
					isValid = false
				}
				break
			case 'phone':
				if (!value) {
					setErrorMessage('Phone Number is required')
					isValid = false
				} else if (value?.length < 10) {
					setErrorMessage('Invalid Phone Number')
					isValid = false
				} else if (!/^\d+$/.test(value)) {
					// Only digits allowed
					setErrorMessage('Please enter numbers only.')
					isValid = false
				} else if (!isValidPhoneNumber(value, country?.code || country[0]?.code)) {
					setErrorMessage('Please enter a valid phone number.')
					isValid = false
				}
				break
			case 'password':
				if (!validatePassword(value)) {
					setErrorMessage(
						'Password must be at least 8 characters long, contain a letter, a number, and a special character.',
					)
					isValid = false
				}
				break
			case 'password2':
				if (!validatePassword(value)) {
					setErrorMessage(
						'Password must be at least 8 characters long, contain a letter, a number, and a special character.',
					)
					isValid = false
				}
				break

			default:
				break
		}
		if (err) {
			setErrorMessage(err)
			isValid = false
		}
		if (isValid) setErrorMessage('')
		return isValid
	}

	const handleBlur = () => {
		setIsFocused(false)
		validateInput() // Validate onBlur
	}

	const handleFocus = () => {
		setIsFocused(true)
	}

	// Toggle password visibility
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}

	// Determine border color based on focus and validity
	// const borderColor = isFocused
	//   ? currentTheme?.secondary // Purple when focused
	//   : errorMessage
	//   ? "red" // Red when there's an error
	//   : currentTheme?.primary; // Default border color

	//phone

	const defCountry = countryList.filter((x: { dial_code: string }) => x.dial_code === '+234')
	const [showCountry, setShowCountry] = useState<boolean>(false)

	const [country, setCoutry] = useState<any>(defCountry)
	const [selectedCountryId, setSelectedCountryId] = useState<any>(null)
	const [filteredCountries, setFilteredCountries] = useState(countryList)
	const [searchQuery, setSearchQuery] = useState('')
	// console.log("country", country.code);

	const handleSearch = (text: string) => {
		setSearchQuery(text)
		const filtered: any = countryList.filter((item: any) =>
			item.name.toLowerCase().includes(text.toLowerCase()),
		)
		setFilteredCountries(filtered)
	}

	const handleSelectContact = (item: {
		dial_code: string
		currency_code: string
		phoneNumbers: { number: string }[]
		code: string
	}) => {
		// const number = item.phoneNumbers[0]?.number || "";
		setCoutry(item)
		setSelectedCountryId(item.code)
		setShowCountry(false)
		setSearchQuery('')
		setFilteredCountries(countryList)

		// ✅ Inform parent of new dial code
		if (typeof onDialCodeChange === 'function') {
			onDialCodeChange(item)
		}
	}

	// Select an icon based on the input type
	const getIcon = () => {
		switch (type) {
			case 'email':
				return (
					<View style={[styles.iconContainer, { backgroundColor: currentTheme?.icon }]}>
						<Ionicons
							name="mail"
							size={20}
							color={
								isFocused ? currentTheme?.secondary : errorMessage ? 'red' : currentTheme?.primary
							}
						/>
					</View>
				)
			case 'name':
				return (
					<View style={[styles.iconContainer, { backgroundColor: currentTheme?.icon }]}>
						<FontAwesome6
							name="user-large"
							size={16}
							color={
								isFocused ? currentTheme?.secondary : errorMessage ? 'red' : currentTheme?.primary
							}
						/>
					</View>
				)
			case 'password':
				return (
					<View style={[styles.iconContainer, { backgroundColor: currentTheme?.icon }]}>
						<MaterialIcons
							name="lock"
							size={20}
							color={
								isFocused ? currentTheme?.secondary : errorMessage ? 'red' : currentTheme?.primary
							}
						/>
					</View>
				)
			case 'password2':
				return null
			case 'phone':
				return null
			// return (

			// )
			case 'date':
				return null

			default:
				return null
		}
	}

	//picker
	const [pickerVisible, setPickerVisibility] = useState<boolean>(false)
	const showPicker = () => {
		setPickerVisibility(true)
	}

	const hidePicker = () => {
		setPickerVisibility(false)
	}
	const handleSelect = (item: any) => {
		onChangeText(item?.label)
		hidePicker()
	}

	//date

	const today = new Date()

	const eighteenYearsAgo = new Date()
	eighteenYearsAgo.setFullYear(today.getFullYear() - 18)

	const hundredYearsAgo = new Date()
	hundredYearsAgo.setFullYear(today.getFullYear() - 100)

	const defaultDate = new Date()
	defaultDate.setFullYear(defaultDate.getFullYear() - 25)

	const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false)

	const showDatePicker = () => {
		setDatePickerVisibility(true)
	}

	const hideDatePicker = () => {
		setDatePickerVisibility(false)
	}

	const handleConfirm = (selectedDate: Date) => {
		// console.warn("A date has been picked: ", selectedDate);

		const today = new Date()
		const age = today.getFullYear() - selectedDate.getFullYear()
		const monthDiff = today.getMonth() - selectedDate.getMonth()
		const dayDiff = today.getDate() - selectedDate.getDate()

		// Adjust age if birthday hasn't occurred yet this year
		const isBirthdayPassed = monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)
		const actualAge = isBirthdayPassed ? age : age - 1

		if (actualAge < 18 || actualAge > 100) {
			Alert.alert('Invalid Age', 'You must be between 18 and 100 years old to continue.')
			hideDatePicker()
			return
		}

		// If valid
		onChangeText(selectedDate) // Or your state update method
		hideDatePicker()
	}

	return (
		<View style={styles.inputContainer}>
			{label && type === 'bvn' ? null : (
				<Text style={[styles.label, { color: labelColor || currentTheme.label }]}>{label}</Text>
			)}
			{type === 'bvn' && (
				<Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
					<Text style={[styles.label, { color: labelColor || currentTheme.label }]}>{label}</Text>
					<Text style={{ fontFamily: getMontserratFontFamily('400'), fontSize: 11 }}>
						{'Don’t know your BVN? Dial '}
						<Text
							style={{ color: currentTheme.primary, fontFamily: getMontserratFontFamily('500') }}
						>
							*565*0#
						</Text>
					</Text>
				</Row>
			)}
			{/* <View style={[styles.inputWrapper, { borderColor }]}> */}
			<View style={styles.inputWrapper}>
				{getIcon()}

				{type === 'phone' ? (
					<View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
						{/* country modal */}
						<CustomModal
							modalVisible={showCountry}
							closeModal={() => setShowCountry(false)}
							noBtn
							closable
						>
							<View style={{ gap: 20, height: SIZES.height / 2 }}>
								<Title text={'Select Country'} textWeight={'600'} textSize={18} center />

								<View style={{ gap: 15, marginVertical: 5 }}>
									<TextInput
										placeholder="Search contacts..."
										value={searchQuery}
										onChangeText={handleSearch}
										style={[
											styles.input,
											{
												backgroundColor: currentTheme?.background,
												color: currentTheme?.tertiary,
											},
										]}
									/>
									<FlatList
										data={filteredCountries}
										keyExtractor={(item, index) => `${item.code}-${index}`}
										renderItem={({ item }: { item: any }) => (
											<TouchableOpacity
												style={styles.contactItem}
												onPress={() => handleSelectContact(item)}
											>
												<View style={styles.contactRow}>
													<View style={{ flex: 1, gap: 4 }}>
														<Title text={item.name} textSize={14} textWeight={'500'} />
														<Text style={styles.phoneText}>{item.dial_code}</Text>
													</View>

													<MaterialCommunityIcons
														name={
															item.code === selectedCountryId
																? 'check-circle'
																: 'checkbox-blank-circle-outline'
														}
														size={24}
														color={currentTheme.primary}
													/>
												</View>
											</TouchableOpacity>
										)}
									/>
								</View>
							</View>
						</CustomModal>
						{/* Dial code selector */}
						{flagEditable !== false ? (
							<Pressable
								onPress={() => {
									if (flagEditable) {
										setShowCountry(!showCountry)
									}
								}}
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									paddingHorizontal: 8,
									gap: 4,
								}}
							>
								<View style={{ borderRadius: 12, overflow: 'hidden' }}>
									<CountryFlag isoCode={country?.code?.toLowerCase() || 'ng'} size={22} />
								</View>
								<AntDesign
									name="caretdown"
									size={14}
									color={hexToRgba(currentTheme.tertiary, 0.6)}
								/>
								<Text
									style={{
										fontSize: 16.3,
										color: hexToRgba(currentTheme.tertiary, 0.6),
									}}
								>
									{country?.dial_code || country[0]?.dial_code}
								</Text>
							</Pressable>
						) : (
							<Text
								style={{
									fontSize: 16,
									color: currentTheme.tertiary,
									opacity: 0.6,
									paddingHorizontal: 8,
								}}
							>
								{country?.dial_code || country[0]?.dial_code}
							</Text>
						)}

						{/* Phone number input */}
						<TextInput
							ref={phoneInput}
							style={[
								styles.input,
								{
									color: currentTheme?.tertiary,
									flex: 1,
									letterSpacing: 1.4,
								},
							]}
							value={value}
							onChangeText={onChangeText}
							placeholder={adjustedPlaceholder}
							placeholderTextColor={currentTheme.subTitle}
							keyboardType={keyboardTpe || 'numeric'}
							onBlur={handleBlur}
							onFocus={handleFocus}
							editable={editable}
						/>
					</View>
				) : type === 'picker' ? (
					<View
						style={{
							flex: 1,
						}}
					>
						<TouchableOpacity
							style={[
								styles.input,
								{
									flex: 1,
									justifyContent: 'center',
									alignItems: 'flex-start',
									height: '100%',
								},
							]}
							onPress={showPicker}
						>
							{!value ? (
								<Text style={{ color: currentTheme.subTitle, fontSize: 14 }}>
									{adjustedPlaceholder}
								</Text>
							) : (
								<Text style={{ color: currentTheme.tertiary, fontSize: 16 }}>{value}</Text>
							)}
						</TouchableOpacity>
						<CustomModal
							center
							padded
							modalVisible={pickerVisible}
							closeModal={hidePicker}
							noBtn
							closable
						>
							<View style={{ gap: 20, maxHeight: SIZES.height / 1.6 }}>
								<Title text={placeholder} textWeight={'600'} textSize={18} center />

								<ScrollView contentContainerStyle={{ gap: 25, marginVertical: 5 }}>
									{pickerData?.map((item: any) => (
										<Pressable key={item?.id} style={{ gap: 7 }} onPress={() => handleSelect(item)}>
											<Row style={{ alignItems: 'center', gap: 10 }}>
												{item?.img && <Image source={item?.img} />}
												<Row
													style={{
														justifyContent: 'space-between',
														width: item?.img ? '88%' : '100%',
													}}
												>
													<Title
														text={item?.label}
														textSize={14}
														textWeight={value === item?.label ? '600' : '400'}
													/>
													{value === item?.label ? (
														<MaterialIcons
															name="radio-button-on"
															size={20}
															color={currentTheme.primary}
														/>
													) : (
														<MaterialIcons
															name="radio-button-off"
															size={20}
															color={currentTheme.primary}
														/>
													)}
												</Row>
											</Row>
											<Demarcator height={1} style={{ marginTop: 10 }} />
										</Pressable>
									))}
								</ScrollView>
							</View>
						</CustomModal>
					</View>
				) : type === 'date' ? (
					<View
						style={{
							flex: 1,
						}}
					>
						<TouchableOpacity
							style={[
								styles.input,
								{
									flex: 1,
									justifyContent: 'center',
									alignItems: 'flex-start',
									height: '100%',
								},
							]}
							onPress={showDatePicker}
						>
							{/* <Text style={{ color: currentTheme.tertiary, fontSize: 16 }}>
                {value === undefined
                  ? formatDateTime(value)
                  : formatDateString(value)}
              </Text> */}
							{value ? (
								<Text style={{ color: currentTheme.tertiary, fontSize: 16 }}>
									{formatDateString(value)}
								</Text>
							) : (
								<Text style={{ color: currentTheme.subTitle, fontSize: 14 }}>
									Select your birthday
								</Text>
							)}
						</TouchableOpacity>
						<DateTimePickerModal
							isVisible={isDatePickerVisible}
							mode="date"
							onConfirm={handleConfirm}
							onCancel={hideDatePicker}
							maximumDate={eighteenYearsAgo} // ✅ No under 18
							minimumDate={hundredYearsAgo} // ✅ No older than 100 restrict
							date={defaultDate} // 👈 Opens pre-filled to 25 years ago
						/>
					</View>
				) : (
					<TextInput
						style={[styles.input, { color: currentTheme?.tertiary }]}
						value={value}
						onChangeText={onChangeText}
						placeholder={adjustedPlaceholder}
						placeholderTextColor={currentTheme.subTitle}
						secureTextEntry={(type === 'password' || type === 'password2') && showPassword}
						onBlur={handleBlur}
						onFocus={handleFocus}
						keyboardType={keyboardTpe || 'default'}
						editable={editable}
					/>
				)}

				{/* Show eye icon for password visibility toggle */}
				{type === 'password' || type === 'password2' ? (
					<TouchableOpacity onPress={togglePasswordVisibility} style={{}}>
						<MaterialIcons
							name={!showPassword ? 'visibility-off' : 'visibility'}
							size={24}
							color="#aaa"
						/>
					</TouchableOpacity>
				) : type === 'picker' ? (
					<TouchableOpacity onPress={togglePasswordVisibility} style={{}}>
						<AntDesign name={pickerVisible ? 'caretright' : 'caretdown'} size={20} color="#aaa" />
					</TouchableOpacity>
				) : type === 'date' ? (
					<TouchableOpacity onPress={showDatePicker} style={{}}>
						<AntDesign name="calendar" size={20} color={'#ccc'} />
					</TouchableOpacity>
				) : type === 'bvn' ? (
					<Text style={{ color: '#07140ACC', fontFamily: getMontserratFontFamily('400') }}>
						{value?.length}/11
					</Text>
				) : type === 'account' ? (
					<Text style={{ color: '#07140ACC', fontFamily: getMontserratFontFamily('400') }}>
						{value?.length}/10
					</Text>
				) : (
					!errorMessage && value && null
					// (
					// 	<View style={[styles.checkContainer, { backgroundColor: currentTheme?.icon }]}>
					// 		{/* Show check icon when there's no error */}
					// 		<FontAwesome6 name="check" size={18} color={currentTheme?.primary} />
					// 	</View>
					// )
				)}
			</View>
			{errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
		</View>
	)
}

const styles = StyleSheet.create({
	inputContainer: {
		// marginBottom: 20,
	},
	inputWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		// borderWidth: 1,
		backgroundColor: 'white',
		paddingHorizontal: 15,
		borderRadius: 16,
		height: 60,
		position: 'relative',
	},
	input: {
		flex: 1,
		height: '100%',
		paddingLeft: 10,
		fontSize: 16,
	},
	label: {
		marginBottom: 6,
		fontSize: 12,
		fontFamily: getMontserratFontFamily('500'),
	},
	checkIcon: {
		marginLeft: 10,
	},
	iconContainer: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8,
	},
	icon1Container: {
		width: 50,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8,
	},
	checkContainer: {
		width: 30,
		height: 30,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8,
	},
	errorText: {
		color: 'red',
		marginTop: 5,
	},
	contactItem: {
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
	},
	phoneText: {
		color: '#888',
		fontSize: 12,
	},
	contactRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
})

export default CInputField
