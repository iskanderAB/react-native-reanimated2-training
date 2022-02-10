import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';



const SIZE = 100.0;
const CIRCLE_RADIUS = SIZE * 2;

type Context = {
  translateX : number;
  translateY : number;
}
export default function App() {
  
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);


  const panGestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent , Context>({
    onStart: (_,context)=>{
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event,context)=>{
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: ()=>{
       const d = Math.sqrt(translateY.value **2 + translateX.value **2);
       if ( d <= CIRCLE_RADIUS + SIZE/2){
        translateX.value = withSpring(0),
        translateY.value = withSpring(0)
       }
    }
  }) 

  const squareAnimationStyle = useAnimatedStyle(()=>{ 
    return{
      transform: [
        {
          translateX: translateX.value
        },
        {
          translateY: translateY.value
        }
      ]
    }
  });

  return (
        <GestureHandlerRootView style={styles.container}>
          <View style={styles.circle}>
            <PanGestureHandler onGestureEvent={panGestureHandler} >
              <Animated.View style={[styles.square , squareAnimationStyle]}/>
            </PanGestureHandler>  
          </View>
        </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal : 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'rgba(0, 0, 256, 0.5)',
    borderRadius: 20,
  },
  circle: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: CIRCLE_RADIUS,
    borderWidth: 5,
    borderColor: 'red',
  },
});