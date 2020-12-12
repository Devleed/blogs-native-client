import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Actions from '../components/Actions';
import BlogCard from '../components/BlogCard';
import OverloayLoader from '../components/OverloayLoader';
import { Spacer, Text, Toast } from '../native components';
import { setBlogs, signOut } from '../redux/actions';
import { SET_VIEWED_BLOG } from '../redux/actions/types';

const HomeScreen = (props) => {
  const blogs = useSelector(({ blogs }) => blogs.list);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  let timeout;

  useEffect(() => {
    (async () => {
      setLoading(true);
      dispatch({ type: SET_VIEWED_BLOG, payload: null });
      const response = await setBlogs(() => setLoading(false));
      if (response.type !== 'error') dispatch(response);
      else {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => setError(null), 5000);
        setError('net not working');
      }
    })();
  }, []);

  if (loading) return <OverloayLoader />;

  return (
    <View style={styles.container}>
      {error ? <Toast error title={error} /> : null}
      {!blogs.length ? (
        <Text h1 style={styles.noBlogTitle}>
          No blogs to {'\n'} show!
        </Text>
      ) : null}
      <Actions
        name="plus"
        action={() => props.navigation.navigate('createBlog')}
        position={{ top: 40, right: 10 }}
      />
      <Actions
        name="logout"
        action={signOut}
        position={{ top: 40, left: 10 }}
      />
      <View style={styles.blogsList}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={blogs}
          style={{ width: '90%' }}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Spacer top={!index ? 0 : 10}>
              <BlogCard item={item} />
            </Spacer>
          )}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
  blogsList: {
    marginTop: 120,
    alignItems: 'center',
  },
  noBlogTitle: {
    position: 'absolute',
    top: 300,
    width: '100%',
    textAlign: 'center',
  },
});
