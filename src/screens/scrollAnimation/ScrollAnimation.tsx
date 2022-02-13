import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import Page from '../../componenets/Page';


const pages = ["Iskander","dali","dhia","khawla","farah"];
const ScrollAnimation = () => {
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event)=>{ 
    scrollX.value= event.contentOffset.x ; 
    console.log("scroll X => ", event.contentOffset.x);
  })

  return (
    <Animated.ScrollView 
      style={styles.container} 
      onScroll={scrollHandler}
      horizontal 
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      scrollEventThrottle={16}
      >
      {pages.map((p,index) => (
        <Page key={index} index={index} title={p} translateX={scrollX} n={pages.length} />
      ))}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
  }
});

export default ScrollAnimation;
