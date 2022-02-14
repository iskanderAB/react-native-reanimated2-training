import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Animated, { Extrapolate, interpolate, measure, runOnJS, useAnimatedGestureHandler, useAnimatedRef, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import {PanGestureHandler, PanGestureHandlerGestureEvent, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

const clamp = (value:number,min:number,max:number)=>{
    'worklet'

    // value between -100 , 100 
    return Math.max(min,Math.min(value,max))
}

const Iconreanimated = Animated.createAnimatedComponent(Icon);

const SwitchCounter = () => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1); 
    const [counter , setCouner] = useState(0);
    const [measure, setMeasure] = 
        useState({
            offSetRangeX: 0,
            offSetRangeY: 0,
        });
    

    useEffect(()=>{
        console.log("connter =>",counter)
    },[counter])    
    const addCount = () => {
        if (counter < 100){
            setCouner((counter)=> counter+1);
        }
    }
    const subCount = () => {
        if (counter > 0){
            setCouner((counter)=> counter-1);
        }
            
    }
    const circleGastureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
        onStart: ()=>{
            scale.value = 1.5;
        },
        onActive: (event)=>{
            translateX.value = clamp(event.translationX,-measure?.offSetRangeX ,measure?.offSetRangeX);
            translateY.value = clamp(event.translationY ,-measure?.offSetRangeY,measure?.offSetRangeY);
        },
        onFinish: (event)=>{
            if (translateX.value === measure.offSetRangeX){
                runOnJS(addCount)();
            }
            else if(translateX.value === -measure.offSetRangeX){
                runOnJS(subCount)();
            }
            translateX.value = withSpring(0);
            translateY.value = withSpring(0);
            scale.value = withSpring(1);
        }
    })
    const onLayout = (e:any)=>{
        setMeasure({
            offSetRangeX: e.nativeEvent.layout.width *.38,
            offSetRangeY: e.nativeEvent.layout.height *.07,
        });
    }
    const circleAnimationStyle = useAnimatedStyle(()=>{
        return { 
            transform: [
                {translateX: translateX.value},
                {translateY: translateY.value},
                {scale: scale.value}
            ],
            
        }
    })

    const textAnimationStyle = useAnimatedStyle(()=>{
        return { 
            opacity: interpolate(translateX.value,
                [-measure.offSetRangeX,0,measure.offSetRangeX],
                [1,.6, 1],
                Extrapolate.CLAMP
            )
        }
    })


    return (
            <View
                onLayout={onLayout}
                style={styles.counter}>
                <TouchableOpacity
                      style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding :5                                               
                      }}  
                      onPress={subCount}
                >
                    <Iconreanimated name="minus" style={[styles.text,textAnimationStyle]} />
                </TouchableOpacity>    
                <Iconreanimated name="close" style={[styles.text,{opacity: .6}]} />
                <TouchableOpacity
                    onPress={addCount}
                    style={{                      
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding:5                                               
                    }} 
                >
                    <Iconreanimated name="plus"  style={[styles.text,textAnimationStyle]}  />
                </TouchableOpacity>
                <View style={styles.circleContainer}>
                <PanGestureHandler onGestureEvent={circleGastureHandler}>   
                    <Animated.View style={[styles.circle,circleAnimationStyle]}>
                        <Text style={[styles.text]}>{counter}</Text>
                    </Animated.View>     
                </PanGestureHandler>
                </View>
            </View>

    )
}

export default SwitchCounter;

const styles = StyleSheet.create({
    counter: { 
        width: 100,
        height: 30,
        backgroundColor :'#111',
        borderRadius: 100,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderColor: "white",
        borderWidth: .5
    },
    text:{ 
        color: 'white',
        fontSize: 14,
    },
    circle: { 
        position: 'absolute',
        width: 25,
        height: 25,
        backgroundColor: '#756f6f',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    circleContainer: { 
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    }
})