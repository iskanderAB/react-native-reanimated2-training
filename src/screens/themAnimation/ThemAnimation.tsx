import { StyleSheet, Switch, Text, View } from 'react-native'
import React, { useState } from 'react'
import Animated, { interpolateColor, useAnimatedStyle, useDerivedValue, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'

type Them = 'light' | 'dark';

const SwitchTraceColor = {
  true: '#8BDB81',
  false: 'red'
}

const Colors = {
  dark: {
    background: '#1E1E1E',
    circle: '#252525',
    text: '#F8F8F8',
  },
  light: {
    background: '#F8F8F8',
    circle: '#FFF',
    text: '#1E1E1E',
  },
};
const App = () => {
  const [them, setThem] = useState<Them>('light');

  const progress = useDerivedValue(()=>{
    return withTiming((them === 'dark' ? 0 : 1),{duration:1000})
  });

  const rStyle = useAnimatedStyle(()=>{
    const backgroundColor =interpolateColor(progress.value,
      [0, 1],
      [Colors.dark.background, Colors.light.background]
      )
    return {
      backgroundColor
    }
  })

  return (
    <Animated.View style={[styles.container,rStyle]}>
      <Switch
        value={them === 'dark'}
        onValueChange={(toggled)=> {
            setThem(toggled ? 'dark':'light')
        }}
        trackColor={SwitchTraceColor}
      />
    </Animated.View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})