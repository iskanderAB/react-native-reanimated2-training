import { Dimensions, Image, StyleSheet, View, } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { GestureHandlerRootView, TapGestureHandler } from 'react-native-gesture-handler';
import Animated, { Extrapolate, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

const { width, height } = Dimensions.get("screen");

const InstagramLike = () => {
  const doubleClick = useRef(null);
  const scale = useSharedValue(0);

  const heartAnimation = useAnimatedStyle(()=>{ 
    return{
      transform: [{
        scale: scale.value
      }],
      opacity: interpolate(scale.value, 
        [0,1],
        [.3,1],
        Extrapolate.CLAMP
        )
    }
  })
  const doubleClickHandler = useCallback(()=>{ 
    scale.value = withTiming(1,{
      duration: 500
    },(f)=>{
        if(f){
          scale.value = withDelay(500,withTiming(0));
        }
    });
  },[])
  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        <TapGestureHandler
          waitFor={doubleClick}
          onActivated={()=>{
            console.log("click ");
          }}
        >
          <TapGestureHandler
            ref={doubleClick}
            numberOfTaps={2}
            onActivated={()=>{
              console.log(" double click");
              doubleClickHandler();
            }}
          >
            <Animated.Image
              source={require('../../../assets/iskander.jpeg')}
              style={styles.image} />
          </TapGestureHandler>
        </TapGestureHandler>
      </GestureHandlerRootView>
      <Animated.Image 
        source={require('../../../assets/heart.png')}
        style={[styles.heart,heartAnimation]}
        />
    </View>

  )
}

export default InstagramLike

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width,
    height: 400,
    resizeMode: 'cover'
  },
  heart: { 
    position: 'absolute',
    width: "50%",
    height: '30%',
    resizeMode: 'contain',
    shadowColor: '#202020',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    overflow: 'visible'
  }
})