import {
  CREATE_BLOG,
  DELETE_BLOG,
  EDIT_BLOG,
  SET_BLOGS,
  SET_VIEWED_BLOG,
} from '../actions/types';

const INITIAL_STATE = {
  list: [],
  viewed: null,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_BLOGS:
      return { ...state, list: [...payload] };
    case CREATE_BLOG:
      return { ...state, list: [...state.list, payload] };
    case SET_VIEWED_BLOG:
      return {
        ...state,
        viewed: state.list.find((item) => item._id === payload),
      };
    case EDIT_BLOG:
      return {
        ...state,
        viewed: (() => {
          if (state.viewed._id === payload._id) {
            return payload;
          }
          return state.viewed;
        })(),
        list: (() => {
          let blogIndex = state.list.findIndex(
            (blog) => blog._id === payload._id,
          );

          if (blogIndex === -1) return state.list;

          state.list[blogIndex] = { ...payload };

          return [...state.list];
        })(),
      };
    case DELETE_BLOG:
      return {
        ...state,
        viewed: (() => {
          if (state.viewed.id === payload.id) return null;
          return state.viewed;
        })(),
        list: (() => {
          let list = state.list;

          console.log('list before =>', list);

          const blogIndex = state.list.findIndex(
            (blog) => blog._id === payload._id,
          );

          console.log('index of blog is', blogIndex);

          if (blogIndex === -1) return state.list;

          list.splice(blogIndex, 1);

          console.log('list after =>', list);

          return [...list];
        })(),
      };
    default:
      return state;
  }
};
