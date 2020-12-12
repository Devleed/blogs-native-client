import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

import { CREATE_BLOG, DELETE_BLOG, EDIT_BLOG, SET_BLOGS } from './types';
import api from '../../utils/api';

export const setBlogs = async (cb) => {
  try {
    const { data } = await api.get('/blogs');

    return { type: SET_BLOGS, payload: data };
  } catch (error) {
    console.error(error);
    return { type: 'error', payload: String(error) };
  } finally {
    cb();
  }
};

export const createBlog = async (body, uid) => {
  try {
    const { data } = await api.post(`/blogs/${uid}`, body);

    return { type: CREATE_BLOG, payload: data };
  } catch (error) {
    return { type: 'error', payload: String(error) };
  }
};

export const editBlog = async (id, uid, changes, cb) => {
  try {
    const { data } = await api.patch(`/blogs/${id}/${uid}`, changes);

    cb();

    return { type: EDIT_BLOG, payload: data };
  } catch (error) {
    console.error(error.response);
    return { type: 'error', payload: String(error) };
  }
};

export const deleteBlog = async (id, uid, cb) => {
  try {
    const { data } = await api.delete(`/blogs/${id}/${uid}`);

    return { type: DELETE_BLOG, payload: data };
  } catch (error) {
    return { type: 'error', payload: String(error) };
  } finally {
    cb();
  }
};

// * AUTH ACTIONS
export const googleSignIn = async () => {
  try {
    const { idToken } = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    const user = await auth().signInWithCredential(googleCredential);

    return { type: 'success', payload: user.user };
  } catch (error) {
    return { type: 'error', payload: String(error) };
  }
};

export const facebookSignIn = async () => {
  try {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw new Error('user cancelled the login process');
    }

    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw new Error('something is wrong with the access token');
    }

    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    const user = await auth().signInWithCredential(facebookCredential);

    return { type: 'success', payload: user.user };
  } catch (error) {
    console.error('error in catch block =>', error);
    return { type: 'error', payload: String(error) };
  }
};

export const signOut = async () => {
  try {
    await auth().signOut();
  } catch (error) {
    console.error('error signing out =>', error);
  }
};
