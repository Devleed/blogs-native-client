import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const Link = (props) => {
  return (
    <TouchableOpacity {...props} style={[styles.link, props.linkStyle]}>
      <Text style={[styles.linkText, props.linkTextStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default Link;

const styles = StyleSheet.create({
  linkText: {
    fontSize: 10,
    textTransform: 'uppercase',
    textAlign: 'right',
  },
});
