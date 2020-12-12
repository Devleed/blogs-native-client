import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { useNavigation } from '@react-navigation/native';

const BackButton = (props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.iconContainer, props.position]}
      onPress={navigation.goBack}>
      <Ionicons name="chevron-back-outline" style={styles.icon} />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 40,
    color: '#535353',
  },
});
