import { transform } from '@babel/core';
import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import Animated, { useAnimatedStyle }  from 'react-native-reanimated';

const {height, width}= Dimensions.get("window");

interface ScrollPageProps{
    text: string,
    translationX:Animated.SharedValue<number>,
    index: number
}

const ScrollPage = ({text,translationX,index}:ScrollPageProps) => {

  const pageAnimatedStyle = useAnimatedStyle(()=>{
      return{
          transform: [{
              translateX: translationX.value
          }]
      }
  })  
  return (
        <Animated.View 
            style={[
                    styles.container,
                    {backgroundColor: `rgba(100,150,10,0.${index+3})`},
                    pageAnimatedStyle
                ]
            }>
            <Text style={{
                color: "red",
                fontSize: 27
            }}>{text}</Text>
        </Animated.View>
  )
}

export default ScrollPage

const styles = StyleSheet.create({
    container: {
        width,
        height,
        alignItems: 'center',
        justifyContent: 'center',
    }
})