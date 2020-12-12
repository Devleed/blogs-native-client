import React from 'react';
import { StyleSheet, View } from 'react-native';

const Spacer = (props) => {
  return (
    <View
      style={{
        marginTop: props.top || props.vertical || props.around || 0,
        marginLeft: props.left || props.horizontal || props.around || 0,
        marginBottom: props.bottom || props.vertical || props.around || 0,
        marginRight: props.right || props.horizontal || props.around || 0,
        ...props.style,
      }}>
      {props.children}
    </View>
  );
};

export default Spacer;

const styles = StyleSheet.create({});
