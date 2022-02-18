import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {GestureHandlerRootView, PinchGestureHandler, PinchGestureHandlerEventPayload, PinchGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { event, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const img = 'https://images.unsplash.com/photo-1621569642780-4864752e847e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80';
const {width , height} = Dimensions.get("window");

const ZoomImage = () => {

  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const pinchHandler =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onActive: (event) => {
        console.log("[event] => " , event);
        scale.value= event.scale;
        focalX.value = event.focalX;
        focalY.value = event.focalY;
      },
      onEnd: (event) => { 
        scale.value = withTiming(1)
      }
    });
    const focalPointStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: focalX.value }, { translateY: focalY.value }],
      };
    });

  const imageStyle = useAnimatedStyle(()=>{ 
    return { 
      transform: [
        { translateX: focalX.value },
        { translateY: focalY.value },
        { translateX: -width / 2 },
        { translateY: -height / 2 },
        { scale: scale.value },
        { translateX: -focalX.value },
        { translateY: -focalY.value },
        { translateX: width / 2 },
        { translateY: height / 2 },
      ]
    }
  })
  
  return (
      <GestureHandlerRootView style={{flex: 1}}>
          <PinchGestureHandler onGestureEvent={pinchHandler}>
            <Animated.View style={{flex: 1}}>
              <Animated.Image source={{uri: img}} style={[{flex: 1},imageStyle]} />
              <Animated.View style={[styles.focalPoint, focalPointStyle]} />
            </Animated.View>
          </PinchGestureHandler>
      </GestureHandlerRootView> 
  )
}

export default ZoomImage

const styles = StyleSheet.create({
  focalPoint: {
    ...StyleSheet.absoluteFillObject,
    width: 10,
    height: 10,
    backgroundColor: 'red',
    opacity: .3,
    borderRadius: 10,
  },
})