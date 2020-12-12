import React from 'react';
import { StyleSheet, Text as NativeText } from 'react-native';

const Text = (props) => {
  let size = props.h1
    ? 40
    : props.h2
    ? 35
    : props.h3
    ? 30
    : props.h4
    ? 25
    : props.h5
    ? 20
    : props.size;

  let weight = props.bold
    ? '700'
    : props.bolder
    ? '800'
    : props.boldest
    ? '900'
    : props.weight;

  let textStyle = {
    ...styles.textStyle,
    fontSize: size,
    color: props.color,
    textTransform: props.transform,
    fontWeight: weight,
  };

  return (
    <NativeText {...props} style={[textStyle, { ...props.style }]}>
      {props.children}
    </NativeText>
  );
};

Text.defaultProps = {
  size: 16,
  color: '#464646',
  transform: 'capitalize',
  weight: 'normal',
};

export default Text;

const styles = StyleSheet.create({
  textStyle: {},
});
