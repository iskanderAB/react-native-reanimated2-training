import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ColorPicker from '../../componenets/ColorPicker';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const COLORS = [
  'red',
  'purple',
  'blue',
  'cyan',
  'green',
  'yellow',
  'orange',
  'black',
  'white',
  'white',
];

const BACKGROUND_COLOR = 'rgba(0,0,0,0.9)';

const {width} = Dimensions.get('window');

const ColorPickerScreen = () => {
  const translateX = useSharedValue(0);

  const circleBackgrounAniamtion = useAnimatedStyle(() => {
    const inputRange = COLORS.map((_, index, array) => {
      return ((index-.5) / array.length) * width;
    });
    return {
      backgroundColor: interpolateColor(translateX.value, inputRange, COLORS),
    };
  });

  return (
    <>
      <View style={styles.topContainer}>
        <Animated.View style={[styles.circle,circleBackgrounAniamtion]} />
      </View>
      <View style={styles.bottomContainer}>
        <ColorPicker
          colors={COLORS}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          translateX={translateX}
          circleBackgrounAniamtion={circleBackgrounAniamtion}
        />
      </View>
    </>
  );
};

export default ColorPickerScreen;

const circleSize = width * 0.6;

const styles = StyleSheet.create({
  topContainer: {
    flex: 3,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BACKGROUND_COLOR,
  },
  circle: {
    width: circleSize,
    aspectRatio: 1,
    borderRadius: circleSize / 2,
  },
});
