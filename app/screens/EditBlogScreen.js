import React, { useRef, useState } from 'react';
import { StatusBar, StyleSheet, View, TextInput } from 'react-native';
import { Button, Text } from '../native components';
import { useDispatch, useSelector } from 'react-redux';

import { editBlog } from '../redux/actions';
import BackButton from '../components/BackButton';
import OverloayLoader from '../components/OverloayLoader';

const EditBlogScreen = (props) => {
  const uid = useSelector(({ auth }) => auth.user.uid);

  const [loading, setLoading] = useState(false);

  const [titleFocus, setTitleFocus] = useState(false);
  const [descFocus, setDescFocus] = useState(false);

  const blog = useSelector(({ blogs }) => blogs.viewed);

  const [title, setTitle] = useState(blog.title || '');
  const [desc, setDesc] = useState(blog.content || '');

  const titleRef = useRef(null);
  const descRef = useRef(null);

  const dispatch = useDispatch();

  const inputs = [
    {
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

  const onFormSubmit = async () => {
    setLoading(true);
    const response = await editBlog(
      blog._id,
      uid,
      { title, content: desc },
      () => setLoading(false),
    );
    dispatch(response);
    if (response.type !== 'error') {
      props.navigation.navigate('viewBlog', { id: blog._id });
    }
  };

  return (
    <>
      <BackButton position={{ top: 40, left: 5 }} />
      <View style={styles.container}>
        <Text h1 bold style={styles.createTitleStyles}>
          Edit blog.
        </Text>
        {inputs.map((input, index) => {
          return (
            <TextInput
              key={index}
              style={[
                styles.inputStyle,
                input.fieldStyle,
                { borderColor: input.isFocussed ? '#060078' : '#d8d8d8' },
              ]}
              ref={input.ref}
              onFocus={() => input.setFocus(true)}
              onBlur={() => input.setFocus(false)}
              placeholder={input.placeholder}
              value={input.value}
              onChangeText={(val) => input.onChangeText(val)}
              multiline={input.multiline}
              numberOfLines={input.lines}
              returnKeyType={index === inputs.length - 1 ? 'default' : 'next'}
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

export default EditBlogScreen;

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
