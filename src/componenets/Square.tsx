import { transform } from '@babel/core'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Animated, { interpolate, useAnimatedStyle, useDerivedValue, withSpring, withTiming } from 'react-native-reanimated';
import { N, SQUARE_SIZE } from './constants';


interface SquareProps { 
    index : number,
    progress: Animated.SharedValue<number>
}


const Square: React.FC<SquareProps> = ({index,progress}) => {
    const offsetAngle = (2 * Math.PI) / N;
    const finalAngle = offsetAngle * (N - 1 - index);
    const rotate = useDerivedValue(() => {
        if (progress.value <= 2 * Math.PI) {
          return Math.min(finalAngle, progress.value);
        }
        if (progress.value - 2 * Math.PI < finalAngle) {
          return finalAngle;
        }
    
        return progress.value;
      }, []);
    
      const translateY = useDerivedValue(() => {
        if (rotate.value === finalAngle) {
          return withSpring(-N * SQUARE_SIZE);
        }
    
        if (progress.value > 2 * Math.PI) {
          return withTiming((index - N) * SQUARE_SIZE);
        }
    
        return withTiming(-index * SQUARE_SIZE);
      });
  const hourHandStyle = useAnimatedStyle(()=>{
    return{
        transform: [
            {rotate: `${rotate.value}rad`},
            {translateY : translateY.value },
        ]
    }
  })

//   console.log(" square number  " , index , "angle" , finalAngle );
  return (
    <Animated.View 
        style={[{ 
            height: SQUARE_SIZE,
            aspectRatio: 1,
            backgroundColor: "rgb(183,21,21)",
            // opacity: (index+1)/12,
            position: 'absolute',
        },
        hourHandStyle   
    ]}
  >
      <Text style={{
          color: "white",
          fontSize: 8,
          textAlign: 'center'
      }}> {index} </Text>
  </Animated.View>    
  )
}

export default Square

const styles = StyleSheet.create({})