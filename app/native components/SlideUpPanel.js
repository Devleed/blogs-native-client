import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Slideuppanel = (props) => {
  const pan = useRef(
    new Animated.ValueXY({ x: 0, y: props.panelStartPosition }),
  ).current;
  const [opened, setOpened] = useState(false);

  const startAnimation = (y) => {
    Animated.timing(pan, {
      toValue: {
        x: 0,
        y,
      },
      duration: props.panelDuration,
      useNativeDriver: false,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          y: pan.y._value,
        });
      },
      onPanResponderMove: (evt, gestureState) => {
        return Animated.event([null, { dy: pan.y }], {
          useNativeDriver: false,
        })(evt, gestureState);
      },
      onPanResponderRelease: (evt, gestureState) => {
        pan.flattenOffset();
        if (gestureState.dy <= -135) {
          startAnimation(0);
          setOpened(true);
        } else {
          startAnimation(props.panelStartPosition);
          setOpened(false);
        }
      },
    }),
  ).current;

  const handlePanel = () => {
    if (opened) {
      startAnimation(props.panelStartPosition);
      setOpened(false);
    } else {
      startAnimation(0);
      setOpened(true);
    }
  };

  return (
    <Animated.View
      style={[styles.panel, { transform: [{ translateY: pan.y }] }]}
      {...panResponder.panHandlers}
    >
      <View style={styles.spanner}>
        <TouchableWithoutFeedback onPress={handlePanel}>
          <MaterialIcon
            name={opened ? 'keyboard-arrow-down' : 'drag-handle'}
            style={styles.spannerIcon}
          />
        </TouchableWithoutFeedback>
      </View>
      {props.children}
    </Animated.View>
  );
};

Slideuppanel.defaultProps = {
  panelStartPosition: 400,
  panelDuration: 500,
};

export default Slideuppanel;

const styles = StyleSheet.create({
  panel: {
    height,
    width,
    borderTopWidth: 1,
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#d4d4d4',
    position: 'absolute',
    zIndex: 500,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  spanner: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#d4d4d4',
  },
  spannerIcon: {
    fontSize: 30,
    color: '#d4d4d4',
  },
});
