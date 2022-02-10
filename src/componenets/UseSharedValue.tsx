import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming } from 'react-native-reanimated';

const squareSize = 100.0; 
const App = () => {
  const progress = useSharedValue(1);
  const scale = useSharedValue(1)
  const borderRadius = useSharedValue(10);
  const reanimatedStyle = useAnimatedStyle(()=>{ 
    return {
      opacity : progress.value,
      transform: [{ scale : scale.value}],
      borderRadius: borderRadius.value,
    }
  })
  useEffect(()=> { 
    // progress.value = withRepeat(withSpring(1), -1 , true); 
    // scale.value = withRepeat(withSpring(3), -1 , true);
    borderRadius.value = withRepeat(withSpring(50), -1 , true);
  },[]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent : 'center',
        alignItems: 'center',
      }}
    >
      <Animated.View  
        style={[
                {
                  height: squareSize ,
                  width: squareSize,
                  backgroundColor: 'orangered'
                },reanimatedStyle ]
              } />
    </View>
  );
};

export default App;