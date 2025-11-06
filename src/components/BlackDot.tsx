import { StyleSheet, View, ViewStyle } from 'react-native'
import React from 'react'

const BlackDot = ({
    style
}:{
    style?: ViewStyle | ViewStyle[]
}) => {
  return (
    <View style={[style, styles.dot]} />
  )
}

export default BlackDot

const styles = StyleSheet.create({
    dot:{
        padding: 3,
        height: 3,
        marginTop: 7,
        borderRadius: 30,
        marginRight: 10,
        backgroundColor: "black",
    }
})