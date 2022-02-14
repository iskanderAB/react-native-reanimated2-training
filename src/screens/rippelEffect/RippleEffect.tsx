import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ripple from '../../componenets/Ripple';

const RippleEffect = () => {
  return (
    <View style={styles.container}>
      <Ripple
        style={styles.ripple}
        onTap={() => {
          console.log('tap');
        }}
      >
        <Text style={styles.text}>Click 🧨</Text>
      </Ripple>
    </View>
  )
}

export default RippleEffect

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    ripple: {
        width: 200,
        height: 100,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        overflow: 'hidden',
        // iOS
        // shadowOpacity: 0.2,
        // shadowOffset: { width: 0, height: 0 },
        // shadowRadius: 20,
        // Android
        elevation: 6,
      },
      text: { 
          color : 'black',
          fontSize: 24
      }
})