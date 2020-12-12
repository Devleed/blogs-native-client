import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { primary_color } from '../colors';

const OverloayLoader = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator size="large" color={primary_color} />
    </View>
  );
};

export default OverloayLoader;

const styles = StyleSheet.create({});
