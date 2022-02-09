import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, { Extrapolation, interpolate, interpolateColor, useAnimatedStyle } from 'react-native-reanimated';

interface PageProps { 
    title: string,
    index: number,
    translateX: Animated.SharedValue<number>,
    n:number
}
const {width , height} = Dimensions.get("window");
const size = 200;

const Page:React.FC<PageProps> = ({title,index,translateX,n}) => {
  const inputRange = [width*(index-1),width*index,(index+1)*width]
  const squareStyle = useAnimatedStyle(()=>{
      return{
          transform: [{
              scale: interpolate(translateX.value,
                inputRange
                ,
                [0 , 1, .0],
                Extrapolation.CLAMP
                )
          }],
          borderRadius:  interpolate(translateX.value,
            [width*(index-1),width*index,(index+1)*width],
            [0 , size/2 ,0],
            Extrapolation.CLAMP
            )}
  }) 
  const textStyle = useAnimatedStyle(()=>{
        const translateY = interpolate(
            translateX.value,
            inputRange,
            [ height/2 , 0 ,-height/2  ],
            Extrapolation.CLAMP
        )
        const opacity = interpolate(
            translateX.value,
            inputRange,
            [0,1,0]
        )
        return  {
            transform: [
                 {
                     translateY
                 }
            ],
            opacity
        }
  })
  const backgroundColorStyle = useAnimatedStyle(()=>{
       const backgroundColor = interpolateColor(translateX.value,
        [0 , width*n],
        ["#6A5495","#E7ED9B"]
        )
       return{
           backgroundColor
       } 
  })
  return (
    <Animated.View style={[styles.page,backgroundColorStyle]} >
        <Animated.View style={[styles.square, squareStyle ]}>
            <Animated.View style={[{position: 'absolute'},textStyle]}>
                <Text style={styles.text}>
                    {title}
                </Text>
            </Animated.View>
        </Animated.View>
    </Animated.View>
  );
};

export default Page;
const styles = StyleSheet.create({
    page:{ 
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center'
    },
    square: { 
        width: size,
        height: size,
        backgroundColor: '#039f9b',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5
    },
    text: { 
        color: 'white',
        fontSize: 30,
        fontWeight: '800',
        textTransform: 'uppercase',
    }
});
