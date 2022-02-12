import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { FC, useRef } from 'react'
import { GestureHandlerRootView, TapGestureHandler, TapGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import Animated, { Extrapolate, interpolate, measure, useAnimatedGestureHandler, useAnimatedRef, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'

interface RippleProps {
    style?: StyleProp<ViewStyle>,
    onTap?: () => void  
}

const Ripple:FC<RippleProps> = ({style, onTap, children}) => {
  const squareRef = useAnimatedRef<Animated.View>(); 
  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);
  const scale = useSharedValue(0);  
  const width = useSharedValue(0);
  const height = useSharedValue(0);

  const tapGestureHandlerEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
      onStart: (event)=>{
        const layout = measure(squareRef);
        console.log("layout " , layout)
        width.value = layout.width;
        height.value = layout.height;

        positionX.value = event.x;
        positionY.value = event.y; 

        scale.value = 0;
        scale.value = withTiming(1,{duration: 1000});
      },
      onActive: (event)=>{
          console.log("clicked ! " , event);
      },
  })  

  const circleStyle = useAnimatedStyle(()=>{
    const circleRaduis = Math.sqrt((width.value**2) + (height.value**2));
    console.log("width =>" , width.value);
    console.log("height => ", height.value);
    
    console.log("circleRaduis => ", circleRaduis);
    return {
        width: circleRaduis*2,
        height: circleRaduis*2,
        backgroundColor: 'black',
        position: 'absolute',
        borderRadius: circleRaduis,
        top: positionY.value - circleRaduis,
        left: positionX.value - circleRaduis,
        transform: [
            {scale: scale.value}
        ],
        opacity : interpolate(scale.value,[0,1],[.3,0],Extrapolate.CLAMP)
    }
  })
  return (
    <GestureHandlerRootView style={styles.container}>
            <TapGestureHandler onGestureEvent={tapGestureHandlerEvent}>
                    <Animated.View 
                        style={style}
                        ref={ squareRef }
                    >
                        {children}
                        <Animated.View style={circleStyle} />
                    </Animated.View>
            </TapGestureHandler>           

    </GestureHandlerRootView>  
  )
}

export default Ripple

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'white',
    }
})