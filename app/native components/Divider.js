import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Divider = (props) => {
  const dividerBarStyle = {
    ...styles.dividerBar,
    backgroundColor: props.color,
  };

  return (
    <View style={styles.divider}>
      <View style={dividerBarStyle} />
      <Text style={[styles.dividerText, { color: props.color }]}>
        {props.title}
      </Text>
      <View style={dividerBarStyle} />
    </View>
  );
};

export default Divider;

Divider.defaultProps = {
  color: 'gray',
};

const styles = StyleSheet.create({
  divider: {
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dividerBar: {
    height: 1,
    backgroundColor: 'gray',
    flex: 1,
  },
  dividerText: {
    color: 'gray',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 10,
    textTransform: 'uppercase',
  },
});
