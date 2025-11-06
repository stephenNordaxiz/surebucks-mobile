import { StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native'
import React, { useRef } from 'react'
import { Screen } from './Screen'

export const Loading = () => {
    const animation = useRef<LottieView | null> (null);
    //for some reason autoplay seize to work
    setTimeout(()=> {
        animation.current?.play();
    }, 100)

  return (
    <Screen style={styles.container}>
      <LottieView
        autoPlay
        ref={animation}
        style={styles.lottie}
        source={require("../assets/lottiesAnimation/loading.json")}
      />
    </Screen>
  )
}

 

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    lottie:{
        height: 250,
        width: 250,
    },
})