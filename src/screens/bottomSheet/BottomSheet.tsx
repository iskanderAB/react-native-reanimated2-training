import React, { useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler'
import BottomSheetComponenet, { BottomSheetRefProps } from '../../componenets/BottomSheetComponenet'

const BottomSheet = () => {
  const bottomSheet = useRef<BottomSheetRefProps>(null);

  const onPress =()=> {
    console.log("clicked")
    if(bottomSheet?.current?.isActive()){
      bottomSheet?.current?.scrollTo(-200);
    }
    else{
      bottomSheet?.current?.scrollTo(0);
    }
  }
  return (
    <GestureHandlerRootView style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        onPress={onPress}  
      />
      <BottomSheetComponenet ref={bottomSheet}/>
    </GestureHandlerRootView>
  )
}

export default BottomSheet

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: { 
      width: 50,
      height: 50,
      backgroundColor: 'green',
      borderRadius: 25
    }
})