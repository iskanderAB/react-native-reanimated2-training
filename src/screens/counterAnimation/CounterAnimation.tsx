import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SwitchCounter from '../../componenets/switchCounter'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const CounterAnimation = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
        <SwitchCounter/>
    </GestureHandlerRootView>
  )
}

export default CounterAnimation

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    }
})