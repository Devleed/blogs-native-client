import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, Animated, StatusBar } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons';

const Toast = (props) => {
  const translateY = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        Animated.spring(translateY, {
          toValue: -100,
          duration: 500,
          delay: props.duration || 1000,
          useNativeDriver: true,
        }).start(({ finished }) => {
          if (finished && props.isFinished) {
            props.isFinished();
          }
        });
      }
    });
  }, []);

  const opacity = translateY.interpolate({
    inputRange: [-100, 0],
    outputRange: [0, 1],
  });

  const renderIcon = () => {
    if (props.success)
      return (
        <MaterialIcon
          name="check-circle-outline"
          style={[styles.toastIcon, { color: 'lightgreen' }]}
        />
      );
    if (props.error)
      return (
        <MaterialIcon
          name="error-outline"
          style={[styles.toastIcon, { color: 'red' }]}
        />
      );
    return null;
  };
  return (
    <Animated.View
      style={[styles.toast, { transform: [{ translateY }], opacity }]}>
      {renderIcon()}
      <Text style={styles.toastText}>{props.title}</Text>
    </Animated.View>
  );
};

export default Toast;

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: StatusBar.currentHeight + 10,
    width: '90%',
    height: 70,
    padding: 5,
    flexDirection: 'row',
    backgroundColor: '#696969',
    zIndex: 9000,
    alignSelf: 'center',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toastText: {
    color: 'white',
    fontSize: 18,
    textTransform: 'capitalize',
  },
  toastIcon: {
    fontSize: 25,
    marginRight: 5,
  },
});
