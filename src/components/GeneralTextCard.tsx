import { StyleSheet, ViewStyle } from 'react-native'
import React from 'react'

import { View, Text } from './Themed';

const GeneralTextCard = ({
    heading,
    body,
    style,
}:{
    heading: string;
    body: string[];
    style?: ViewStyle | ViewStyle[]
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.heading}>{heading}</Text>
      {body.map((item, index) =>
        <Text key={index} style={styles.text}>{item}</Text>
      )}
    </View>
  )
}

export default GeneralTextCard

const styles = StyleSheet.create({
    container:{
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        padding: 7,
        width: 250,
    },
    heading:{
        textTransform: "capitalize",
        fontWeight: "bold",
        paddingVertical: 5,
    },
    text:{},
})