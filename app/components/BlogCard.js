import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

import { Spacer, Text } from '../native components';

const BlogCard = (props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.blogCard}
      onPress={() => navigation.navigate('viewBlog', { id: props.item._id })}>
      <View style={styles.blogCardHeader}>
        <Text h4 bold numberOfLines={1} style={{ width: 220 }}>
          {props.item.title}
        </Text>
        <AntDesign name="eyeo" style={styles.viewBlogBtn} />
      </View>
      <View style={styles.blogMetaInfo}>
        <Text size={12} color="gray" numberOfLines={1}>
          {props.item.author} --- {moment(props.item.date).format('ll')}
        </Text>
      </View>
      <Spacer top={20}>
        <Text size={12} color="gray" numberOfLines={3}>
          {props.item.content}
        </Text>
      </Spacer>
    </TouchableOpacity>
  );
};

export default BlogCard;

const styles = StyleSheet.create({
  blogCard: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#d8d8d8',
    borderRadius: 10,
  },
  viewBlogBtn: {
    fontSize: 25,
    color: '#535353',
    marginLeft: 'auto',
  },
  blogCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blogMetaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
