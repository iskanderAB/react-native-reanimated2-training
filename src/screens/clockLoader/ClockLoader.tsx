import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Square from '../../componenets/Square'
import { N } from '../../componenets/constants'
import { useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'

const ClockLoader = () => {
  const progress = useSharedValue(0);


  useEffect(() => {
    progress.value = 0;
    progress.value = withRepeat(withTiming(4* Math.PI,{duration : 8000}),-1)
    console.log('gooo')
  }, [])
  
  return (
    <View style={styles.container}>
      {new Array(N).fill(0).map((_,index)=>{ 
        return <Square key={index} index={index} progress={progress} />
      })}
    </View>
  )
}

export default ClockLoader

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        backgroundColor: 'rgb(9, 0, 7)',
        justifyContent: 'center',
        alignItems: 'center'
    }
})