/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleSheet, ViewStyle,View, Text,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useThemeStore } from '@/stores/themeStore';


const TextMoreOrLess = ({
    children,
    initialLine = 1,
    style,
}: {children: string;
    initialLine: number;
    style: ViewStyle;
}) => {
    const [textShown, setTextShown] = useState(false);
    const [lengthMore, setLengthMore] = useState(false);
    const theme = useThemeStore((s)=> s.theme);

    const toggleNumberOfLines = () => {
        setTextShown(!textShown);
    }

    const onTextLayout = (e: {nativeEvent: { lines: any}}) => {
       const { lines} = e.nativeEvent;
       if(lines && Array.isArray(lines) && lines.length > 0){
        //theres more text that can be shown
        //needs to be >= to work on both ios and android
        // if > it wont work on ios

        if(lines.length >= initialLine){
            setLengthMore(true)
        }
       }
    }

  return (
    <View style={style}>
      <Text 
        onTextLayout={onTextLayout}
        numberOfLines={textShown? undefined : initialLine}
        >
            {children}
      </Text>
      {lengthMore ? 
        <TouchableOpacity style={styles.lengthMore} onPress={toggleNumberOfLines}>
            <Text style={{color: theme.lightPrimary}}>{textShown ? "Read less": "Read More"}</Text>
        </TouchableOpacity>
        : null
      }
    </View>
  )
}

export default TextMoreOrLess

const styles = StyleSheet.create({
    lengthMore:{
        paddingVertical: 5,
        zIndex: 30,
    }
})