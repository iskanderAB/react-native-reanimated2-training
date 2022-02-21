import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';


const {width} = Dimensions.get("window");

interface AnimatedPosition {
  x: Animated.SharedValue<number>;
  y: Animated.SharedValue<number>;
}

const useFollow = ({x, y}: AnimatedPosition) => {
  const followX = useDerivedValue(() => {
    return withSpring(x.value);
  });
  const followY = useDerivedValue(() => {
    return withSpring(y.value);
  });
  const circleStyle = useAnimatedStyle(() => ({
    transform: [{translateX: followX.value}, {translateY: followY.value}],
  }));
  return {
    followX,
    followY,
    circleStyle
  }
};

const MessengerBallFollow = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const translationContext = useSharedValue({
    x: 0,
    y: 0,
  });

  const gesture = Gesture.Pan()
    .onStart(event => {
      translationContext.value = {x: translateX.value, y: translateY.value};
    })
    .onUpdate(event => {
      translateX.value = event.translationX + translationContext.value.x;
      translateY.value = event.translationY + translationContext.value.y;
    })
    .onFinalize(()=>{
      if(translateX.value >= width/2){
        translateX.value = withSpring(width-70);
      }
      else { 
        translateX.value= withSpring(0);
      }
    })

  const circlenAimatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}, {translateY: translateY.value}],
  }));


  const {followX: redTranslateX, followY: redTranslateY, circleStyle: redCircle} = useFollow({x:translateX,y:translateY})
  const {circleStyle: blueCircle} = useFollow({x:redTranslateX,y:redTranslateY})

  return (
    <GestureHandlerRootView style={styles.container}>
      <Animated.View style={[styles.circle,{backgroundColor: 'blue'},blueCircle]} />
      <Animated.View style={[styles.circle,{backgroundColor: 'red'},redCircle]} />
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.circle, circlenAimatedStyle]} />
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default MessengerBallFollow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : 'white'
  },
  circle: {
    width: 70,
    height: 70,
    backgroundColor: 'yellow',
    borderRadius: 35,
    position: 'absolute',
    elevation: 6
  },
});
