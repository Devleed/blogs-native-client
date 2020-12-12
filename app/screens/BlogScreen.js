import React, { useCallback, useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';

import { deleteBlog } from '../redux/actions';

import { Spacer, Text } from '../native components';
import BackButton from '../components/BackButton';
import { SET_VIEWED_BLOG } from '../redux/actions/types';
import OverloayLoader from '../components/OverloayLoader';

const BlogScreen = (props) => {
  const id = props.route.params.id;
  const dispatch = useDispatch();
  const blog = useSelector(({ blogs }) => blogs.viewed);
  const uid = useSelector(({ auth }) => auth.user.uid);

  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      dispatch({ type: SET_VIEWED_BLOG, payload: id });

      return () => {
        setLoading(false);
      };
    }, [id]),
  );

  const deleteCurrentBlog = async () => {
    setLoading(true);

    dispatch(
      await deleteBlog(id, uid, () => {
        setLoading(false);
        props.navigation.navigate('home');
      }),
    );
  };

  if (loading) return <OverloayLoader />;

  if (!blog) return <View />;

  return (
    <>
      {blog.authorUid === uid ? (
        <View style={styles.iconStack}>
          <TouchableOpacity
            style={styles.editBlogBtn}
            onPress={() => props.navigation.navigate('editBlog', { id })}>
            <SimpleLineIcons
              name="pencil"
              style={styles.icon}
              color="#535353"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteBlogBtn}
            onPress={deleteCurrentBlog}>
            <MaterialIcons
              name="delete-outline"
              style={styles.icon}
              color="maroon"
            />
          </TouchableOpacity>
        </View>
      ) : (
        <BackButton position={{ top: 40, left: 5 }} />
      )}
      <ScrollView style={styles.container}>
        <View style={styles.blogCardHeader}>
          <Text h2 bold>
            {blog.title}
          </Text>
        </View>
        <View style={styles.blogMetaInfo}>
          <Text size={12} color="gray">
            {blog.author} - {moment(blog.date).format('ll')}
          </Text>
        </View>
        <Spacer top={20}>
          <Text size={12} color="gray">
            {blog.content}
          </Text>
        </Spacer>
      </ScrollView>
    </>
  );
};

export default BlogScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 100,
  },
  icon: {
    fontSize: 25,
  },
  iconStack: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 60,
    width: '100%',
    paddingHorizontal: 25,
  },
});
