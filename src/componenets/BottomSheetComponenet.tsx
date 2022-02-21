import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useImperativeHandle } from 'react'
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

interface Context { 
  y : number
}
const {height,width} = Dimensions.get("window");

type BottomSheetProps = {
  children?: React.ReactNode;
};

export type BottomSheetRefProps = {
  scrollTo: (destination: number) => void;
  isActive: ()=>boolean
};


const BottomSheetComponenet = React.forwardRef(({children},ref) => {
  const translateY = useSharedValue(0);
  const active = useSharedValue(false);


  const context = useSharedValue<Context>({
    y : 0
  });
  const scrollTo = useCallback((destination: number)=>{
    'worklet'
    active.value= !active.value;
    console.log("shared value", translateY.value);
    translateY.value = withSpring(destination, { damping: 50 });
  },[])

  const isActive = useCallback(()=>active.value,[])
  // useEffect(()=>{
  //   scrollTo(200)
  // },[])

  useImperativeHandle(ref,()=>({scrollTo,isActive}),[scrollTo]);

  const gesture = Gesture.Pan()
      .onStart((event) => {
        console.log(event);
        context.value = { y: translateY.value };
      })
      .onUpdate((event) => {
        console.log(translateY.value , height);
        translateY.value = Math.max(event.translationY + context.value.y , -(height));
      })
      .onEnd(()=>{
        translateY.value = withSpring(
          (translateY.value < -height/1.5 ? -height 
          :translateY.value > -height/3? -height*.3:
          translateY.value
          )
          ,{damping:50});
      })

  const sheetAnimatedStyle = useAnimatedStyle(()=>(
    {
      transform: [
        {translateY: translateY.value}
      ],
      borderRadius: interpolate(translateY.value,
        [-(height*.8), -(height)],
        [25,1],
        Extrapolate.CLAMP
        )
    }
  ))
  return (
    <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.container,sheetAnimatedStyle]}>
            <View style={styles.line}/>
        </Animated.View>
      </GestureDetector>
  )
})

export default BottomSheetComponenet

const styles = StyleSheet.create({
    container: { 
        width,
        height,
        backgroundColor: 'orange',
        top: height,
        borderRadius: 25 ,
        alignItems: 'center',
        position: 'absolute'
    },
    line: {
      backgroundColor: '#3d3633c2',
      height:3,
      width :40,
      marginTop: 10,
      borderRadius: 2
    }
})