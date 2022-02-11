import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, gestureHandlerRootHOC, GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import Task from '../../componenets/Task';
import Animated from 'react-native-reanimated';



const SwipToDelete = () => {
  const [Tasks, setTasks] = useState([
   "0",
   "1",
   "2",
   "3",
   "4",
   "5"
  ].map((title,index)=>({title,index})));
//FIXME: 
  // probleme UI delete 2 items in the same time 
  const onDeleteHandler = useCallback((index)=> { 
    setTasks((Tasks) => Tasks.filter((v)=> v.index !== index ));
    console.log("deleted item is ======> " , index  )
  },[]) 


  useEffect(()=>{
    console.log("tasks => " , Tasks)
  },[Task]);

  return (
    <View style={styles.container}>
        <StatusBar
            animated={false}
            backgroundColor="transparent"
            barStyle='dark-content'
            showHideTransition='slide'
            hidden={false} 
        />
      <Text style={styles.title}>⏰All tasks⏰</Text>  
      <GestureHandlerRootView style={styles.list}>
        <Animated.FlatList
            data={Tasks}
            renderItem={({item})=> <Task index={item.index} title={item.title} onDeleteHandler={onDeleteHandler} />}
            keyExtractor={(item,index)=> index.toString()}
        />
      </GestureHandlerRootView>
    </View>
  )
}

export default SwipToDelete

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ca6702',
        height: 20,  
    },
    title: {
        textAlign: 'center',
        fontFamily: 'serif',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fffcef',
    },
    list: { 
        flex: 1,
        backgroundColor: '#fffcef',
        paddingTop: 5
    }
})