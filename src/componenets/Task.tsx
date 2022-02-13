import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { memo, useRef } from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import Animated, { Extrapolate, Extrapolation, interpolate, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
interface Props {
    title: string,
    index: number,
    onDeleteHandler: (index: number)=>void,
}


const {width, height} = Dimensions.get('window');
const Task: React.FC<Props> = memo(({title, index, onDeleteHandler}) => {
  const ref = useRef(0);
  const translationX = useSharedValue(0);
  const itemHeight = useSharedValue(100);
  

  const gastureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) =>{
      if (event.translationX < 0){
        translationX.value = event.translationX;
        console.info(" vitess  =>  ",event.velocityX );
      }
    },
    onEnd:(event)=>{
      console.log("end translation  => ",Math.abs(translationX.value), " width => ", width/2);
      console.log("end velocity  => ",Math.abs(event.velocityX), " velocity  => 2000");
      console.log("result => ",( Math.abs(translationX.value) >= width/4 && Math.abs(event.velocityX) > 2000 ) )
      if (Math.abs(translationX.value) >= width/2 || ( Math.abs(translationX.value) >= width/4 && Math.abs(event.velocityX) > 2000 ) )
        translationX.value= withTiming(-width-10,undefined,(finished)=>{
            if(finished){
              console.log("deleted UI");
              itemHeight.value= withTiming(0,{
                duration: 50
              },()=>{
                runOnJS(onDeleteHandler)(index);
                console.log( "this is was deleted => ", index);
              }
                );
             
            }
        });
      else{
        translationX.value= withSpring(0)
      }

    }
  }) 
  const swipStyle = useAnimatedStyle(()=>{ 
    return { 
      transform : [{translateX : translationX.value}]
    }
  })
  const containerStyle = useAnimatedStyle(()=>{
    return { 
      height : itemHeight.value 
    }
  })

  const iconStyle = useAnimatedStyle(()=>{
    return{
      opacity: interpolate((-translationX.value), 
        [0 ,width/2, width],
        [0 ,1, 0],
        Extrapolation.CLAMP
        ),    
    }
  })
  
  console.log("tasks randred !" , ref.current++); 

  return (
    <Animated.View style={[styles.container,containerStyle]} >
      <Animated.View style={[styles.icon,iconStyle]}>
        <Icon name="trash-o" size={35} color="red" />
      </Animated.View>
      <PanGestureHandler onGestureEvent={gastureHandler}>
        <Animated.View style={[styles.swipeable,swipStyle]}>
          <Text style={styles.text}>{title}</Text>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  )
})

export default Task

const styles = StyleSheet.create({
  container: {
    borderColor: "white",
    justifyContent: 'center',
    // backgroundColor: 'red'
  },
  swipeable: { 
    width: '90%',
    backgroundColor: '#ee9b00',
    margin:  10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    elevation: 6,
    borderRadius: 8,
  },
  text: { 
    color: 'black',
    fontFamily: 'Festive-Regular',
    fontSize: 20
  },
  icon: { 
    height: 40,
    width: 40,
    position: 'absolute',
    right: "10%",
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0
  }
})