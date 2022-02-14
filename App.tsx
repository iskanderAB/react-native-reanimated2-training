import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RippleEffect from './src/screens/rippelEffect/RippleEffect'
import ZoomImage from './src/screens/zoomImage/ZoomImage'
import ScrollAnimation from './src/screens/scrollAnimation/ScrollAnimation'
import GasterHundler from './src/screens/gsestureHandler/GestureHandler'
import ThemAnimation from './src/screens/themAnimation/ThemAnimation'
import InstagramLike from './src/screens/instagramLike/InstagramLike'
import CounterAnimation from './src/screens/counterAnimation/CounterAnimation'
import SwipToDelete from './src/screens/swipToDelete/SwipToDelete'
import SwitchCounter from './src/componenets/switchCounter'
import PanGestureHandlerScroll from './src/screens/PanGestureHandlerScroll/PanGestureHandlerScroll'




const App = () => {
  return (
      <PanGestureHandlerScroll/>
  )
}

export default App

const styles = StyleSheet.create({})