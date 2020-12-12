import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';

import { facebookSignIn, googleSignIn } from '../redux/actions';
import OverlayLoader from '../components/OverloayLoader';
import { Button, Spacer, Toast } from '../native components';

const AuthScreen = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  let timeout;

  useFocusEffect(
    useCallback(() => {
      return () => {
        setLoading(false);
      };
    }, []),
  );

  const signIn = async (provider) => {
    setLoading(true);

    let response;

    if (provider === 'google') {
      response = await googleSignIn();
    } else {
      response = await facebookSignIn();
    }

    if (response.type === 'error') {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        setError(null);
      }, 10000);
      setError('their appears to be a problem with your network');
    }
  };

  if (loading) return <OverlayLoader />;

  return (
    <View style={styles.container}>
      {error ? <Toast error title={error} /> : null}
      <View style={styles.btnStack}>
        <Button
          onPress={() => signIn('google')}
          rounded
          title="Sign in"
          mainColor="transparent"
          btnStyle={styles.authBtn}
          icon={<FontAwesome name="google" style={styles.authIcon} />}
          disabled={loading}
        />
        <Spacer vertical={5} />
        <Button
          onPress={() => signIn('facebook')}
          rounded
          title="Sign in"
          mainColor="transparent"
          btnStyle={styles.authBtn}
          icon={<FontAwesome name="facebook" style={styles.authIcon} />}
          disabled={loading}
        />
      </View>
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStack: {
    position: 'absolute',
  },
  authBtn: {
    borderWidth: 1,
    borderColor: '#d8d8d8',
    justifyContent: 'flex-start',
    width: 200,
  },
  authIcon: {
    marginHorizontal: 20,
    fontSize: 20,
  },
});
