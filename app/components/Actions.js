import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';

const AddButton = (props) => {
  return (
    <TouchableOpacity
      style={[styles.addIcon, props.position]}
      onPress={() => props.action?.()}>
      <AntDesign name={props.name} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  addIcon: {
    position: 'absolute',
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 30,
    color: '#535353',
  },
});
