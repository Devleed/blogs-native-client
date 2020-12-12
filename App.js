import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { GoogleSignin } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';

import HomeScreen from './app/screens/HomeScreen';
import CreateBlogScreen from './app/screens/CreateBlogScreen';
import BlogScreen from './app/screens/BlogScreen';
import EditBlogScreen from './app/screens/EditBlogScreen';

import store from './app/redux/store';
import { ActivityIndicator, StatusBar } from 'react-native';
import AuthScreen from './app/screens/AuthScreen';
import { SIGN_IN, SIGN_OUT } from './app/redux/actions/types';
import OverloayLoader from './app/components/OverloayLoader';

const Stack = createStackNavigator();

const Navigator = () => {
  const [initializing, setInitializing] = useState(true);
  const isLoggedIn = useSelector(({ auth }) => auth.isLoggedIn);

  const dispatch = useDispatch();

  const onAuthStateChanged = (user) => {
    if (user) {
      dispatch({ type: SIGN_IN, payload: user });
    } else {
      dispatch({ type: SIGN_OUT, payload: user });
    }
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  GoogleSignin.configure({
    webClientId: '609068883017-77utouel98kt9l8q1o5cjmcp1ebsi0fq',
  });

  if (initializing) return <OverloayLoader />;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <Stack.Screen name="auth" component={AuthScreen} />
        ) : (
          <>
            <Stack.Screen name="home" component={HomeScreen} />
            <Stack.Screen name="createBlog" component={CreateBlogScreen} />
            <Stack.Screen name="viewBlog" component={BlogScreen} />
            <Stack.Screen name="editBlog" component={EditBlogScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <Navigator />
    </Provider>
  );
};

export default App;

// ! =========================== REACT NATIVE SCREEN OPTIONS ====================================
// * FOR SCREEN ANIMATION CHANGES
/*
        gestureEnabled: false,
        transitionSpec: {
          open: { animation: 'timing', config: { duration: 500 } },
          close: { animation: 'timing', config: { duration: 500 } },
        },
        cardStyleInterpolator: ({ current }) => {
          return {
            cardStyle: {
              opacity: current.progress,
            },
          };
        }, 
        
*/
