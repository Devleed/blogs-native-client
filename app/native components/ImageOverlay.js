import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';

const ImageOverlay = (props) => {
  return (
    <ImageBackground style={styles.backgroundImage} {...props}>
      <View
        style={[
          styles.imageOverlay,
          {
            backgroundColor: props.overlayColor,
            zIndex: props.loading ? 9000 : 0,
          },
        ]}
      >
        {props.loading ? (
          <ActivityIndicator
            size="large"
            style={styles.loader}
            color={props.loaderColor}
          />
        ) : null}
      </View>
      {props.children}
    </ImageBackground>
  );
};

export default ImageOverlay;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '20%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0.8,
  },
  loader: {
    flex: 1,
  },
});
