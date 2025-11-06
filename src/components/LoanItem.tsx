/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { CView, Demarcator, Row, SubmitBtn, Title } from '.'
import { nairaSymbol } from '@/utils'
import { getMontserratFontFamily, hexToRgba } from '@/utils/checker'

const LoanItem = ({ item, onPress }: { item: any; onPress: () => void }) => {
	const [status, setstatus] = useState('')
	useEffect(() => {
		if (item?.paid) {
			setstatus('Paid')
		} else {
			setstatus('Active')
		}
	}, [item])

	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<CView style={{ gap: 10 }}>
				<SubmitBtn
					style={{ alignSelf: 'flex-end', position: 'absolute', right: 20, top: -5 }}
					btnHeight={12}
					textColor={status === 'Active' ? '#B9700A' : '#10862F'}
					btnWidth={46}
					fontSize={8}
					bgColor={status === 'Active' ? hexToRgba('#ffa11d', 0.4) : hexToRgba('#1dff47', 0.2)}
					title={status}
				/>
				<Row style={styles.titleWrapper}>
					<Title text={item?.purpose} textWeight={'600'} />
					<Title textSize={14} textWeight={'500'} text={nairaSymbol(item?.amountDue)} />
				</Row>
				<Demarcator height={0.6} />
				<Row style={styles.titleWrapper}>
					<Text style={{ fontSize: 8, fontFamily: getMontserratFontFamily('400') }}>
						Due Date:{' '}
						<Text style={{ fontSize: 10, fontFamily: getMontserratFontFamily('500') }}>
							{item?.dueDate}
						</Text>
					</Text>
					<Row style={{ alignItems: 'center', gap: 6 }}>
						<Title text={'Details'} textSize={10} />
						<FontAwesome name="angle-right" size={12} color="black" />
					</Row>
				</Row>
			</CView>
		</TouchableOpacity>
	)
}

export default LoanItem

const styles = StyleSheet.create({
    container:{
        marginTop:10,
    },
	titleWrapper: {
		alignItems: 'center',
		justifyContent: 'space-between',
	},
})
