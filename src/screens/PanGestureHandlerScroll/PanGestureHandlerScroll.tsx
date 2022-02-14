import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { GestureHandlerGestureEvent, GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { cancelAnimation, useAnimatedGestureHandler, useSharedValue, withDecay, withSpring } from 'react-native-reanimated';
import ScrollPage from '../../componenets/ScrollPage';

const PAGES = ["Iskander", "Ali", "Mohammed", "Naji"]; 

const {height, width}= Dimensions.get("window");
interface ctx { //context for save previos translationX 
    trannlationX: number
}
const clamp = (value: number, min:number,max: number): number =>{
    "worklet"
    return Math.max(min ,Math.min(max,value))
}
const PanGestureHandlerScroll = () => {
  const translationX = useSharedValue(0);

  const scrollEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent,ctx>({
    onStart: (_,ctx)=>{
        ctx.trannlationX = translationX.value;
        cancelAnimation(translationX);
    },  
    onActive:(e,ctx)=>{
            console.log(clamp(e.translationX+ctx.trannlationX,-(width*PAGES.length),0));
            translationX.value = clamp(e.translationX+ctx.trannlationX,-(width*(PAGES.length-1)),0);
    },
    onFinish: (event)=>{ 
        translationX.value = withDecay({ velocity: event.velocityX ,clamp:[-(width*(PAGES.length-1)),0]})
    }
  })  

    
  return (
    <GestureHandlerRootView>  
        <PanGestureHandler
            onGestureEvent={ scrollEvent }
        >
            <Animated.View style={styles.container}>
            {
                PAGES.map((page,index)=>{
                    return <ScrollPage 
                                key={ index } 
                                text={page} 
                                index={index}
                                translationX={translationX}    
                            />
                })
            }
            </Animated.View>
        </PanGestureHandler>    
    </GestureHandlerRootView>
  )
}

export default PanGestureHandlerScroll

const styles = StyleSheet.create({
    container: {
        width : width*4,
        height,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
})