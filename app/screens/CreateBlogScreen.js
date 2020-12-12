import React, { useCallback, useRef, useState } from 'react';
import { StatusBar, StyleSheet, View, TextInput } from 'react-native';
import { Button, Text, Toast } from '../native components';
import { useDispatch, useSelector } from 'react-redux';

import { createBlog } from '../redux/actions';
import BackButton from '../components/BackButton';
import OverloayLoader from '../components/OverloayLoader';
import { useFocusEffect } from '@react-navigation/native';
import { primary_color } from '../colors';

const CreateBlogScreen = (props) => {
  const loggedInUser = useSelector(({ auth }) => auth.user);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [titleFocus, setTitleFocus] = useState(false);
  const [descFocus, setDescFocus] = useState(false);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const titleRef = useRef(null);
  const descRef = useRef(null);

  const dispatch = useDispatch();

  const inputs = [
    {
      placeholder: "What's the blog about ?",
      ref: titleRef,
      value: title,
      onChangeText: setTitle,
      isFocussed: titleFocus,
      setFocus: setTitleFocus,
      fieldStyle: styles.titleInput,
      lines: 1,
      multiline: false,
    },
    {
      placeholder: 'Describe...',
      ref: descRef,
      value: desc,
      onChangeText: setDesc,
      isFocussed: descFocus,
      setFocus: setDescFocus,
      fieldStyle: styles.descriptionInput,
      lines: 10,
      multiline: true,
    },
  ];

  let errorTimeout;

  useFocusEffect(
    useCallback(() => {
      return () => {
        setLoading(false);
        setTitle('');
        setDesc('');
      };
    }, []),
  );

  const onFormSubmit = async () => {
    if (!title || !desc) {
      if (errorTimeout) clearTimeout(errorTimeout);
      errorTimeout = setTimeout(() => setError(null), 5000);
      setError('please fill all fields');
    } else {
      setLoading(true);
      const response = await createBlog(
        {
          author: loggedInUser.displayName || loggedInUser.name,
          title,
          content: desc,
        },
        loggedInUser.uid,
      );
      dispatch(response);
      if (response.type !== 'error') {
        setLoading(false);
        props.navigation.navigate('home');
      }
    }
  };

  return (
    <>
      {error ? <Toast title={error} error /> : null}
      <BackButton position={{ top: 40, left: 5 }} />
      <View style={styles.container}>
        <Text h1 bold style={styles.createTitleStyles}>
          Create your own blog.
        </Text>
        {inputs.map((input, index) => {
          return (
            <TextInput
              key={index}
              style={[
                styles.inputStyle,
                input.fieldStyle,
                { borderColor: input.isFocussed ? primary_color : '#d8d8d8' },
              ]}
              ref={input.ref}
              onFocus={() => input.setFocus(true)}
              onBlur={() => input.setFocus(false)}
              placeholder={input.placeholder}
              value={input.value}
              onChangeText={(val) => input.onChangeText(val)}
              multiline={input.multiline}
              numberOfLines={input.lines}
              returnKeyType={index === inputs.length - 1 ? 'none' : 'next'}
              onSubmitEditing={() => inputs[index + 1]?.ref.current.focus()}
              blurOnSubmit={index === inputs.length - 1 ? true : false}
              editable={!loading}
            />
          );
        })}
        <Button
          title="Post"
          mainColor="#060078"
          textColor="#fff"
          btnStyle={styles.postBtnStyle}
          onPress={onFormSubmit}
          loading={loading}
          disabled={loading}
        />
      </View>
    </>
  );
};

export default CreateBlogScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    marginTop: StatusBar.currentHeight + 80,
  },
  createTitleStyles: {
    fontFamily: 'sans-serif',
    letterSpacing: -2,
  },
  inputStyle: {
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
  },
  authorInput: {
    height: 40,
  },
  titleInput: {
    height: 40,
  },
  descriptionInput: {
    height: 150,
    textAlignVertical: 'top',
  },
  postBtnStyle: {
    marginTop: 20,
  },
});
