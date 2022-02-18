import React from 'react';
import {Dimensions, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

import Animated, { AnimateStyle, event, interpolate, interpolateColor, SharedValue, useAnimatedGestureHandler, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring } from 'react-native-reanimated';

import LinearGradient, {
  LinearGradientProps,
} from 'react-native-linear-gradient';


interface ColorPickerProps extends LinearGradientProps {
    translateX: SharedValue<number>,
    circleBackgrounAniamtion: AnimateStyle<ViewStyle>
}

const {width} = Dimensions.get('window');

const clamp = (value:number ,max:number ,min:number)=> { 
    "worklet"
    return Math.max(Math.min(value,max),min);
}
const ColorPicker: React.FC<ColorPickerProps> = ({colors, start, end,translateX,circleBackgrounAniamtion}) => {

 
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);  
  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent,{translationX: number}>({
      onStart: (event,context)=>{
        context.translationX = translateX.value;
        translateY.value = withSpring(-50);
        scale.value = withSpring(1.2);
        translateX.value= withSpring(clamp((event.x-20),(width*.9-40),0));
        console.log("hello" , translateX.value);
      },
      onActive: (event,context)=>{
        translateX.value= clamp((event.x-20),(width*.9-40),0);
        console.log("clamped value  =>",translateX.value);
      },
      onFinish: ()=>{
        translateY.value = withSpring(0);
        scale.value = withSpring(1);
      }
  });

  const circleAnimatedStyle = useAnimatedStyle(()=>{
    return { 
        left: translateX.value,
        transform: [
            // {translateX: translateX.value},
            {translateY: translateY.value},
            {scale: scale.value}
        ],
        // backgroundColor: interpolateColor(translateX.value,
        //     inputRange,
        //     colors
        // )
    }
  })

  return (
    <GestureHandlerRootView>
      <PanGestureHandler
        onGestureEvent={panGesture}
      >
        <Animated.View style={styles.container}>
          <LinearGradient
            colors={colors}
            start={start}
            end={end}
            style={styles.linearGradient}
          />
          <Animated.View 
            style={[styles.circle,circleAnimatedStyle,circleBackgrounAniamtion]} />
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default ColorPicker;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  linearGradient: {
    height: 40,
    width: width * 0.9,
    borderRadius: 30,
  },
  circle: {
    width: 40,
    height: 40,
    backgroundColor: 'transparent',
    position: 'absolute',
    borderRadius: 20,
    borderWidth: 10,
    borderColor: "#7a7575ad"
  },
});
