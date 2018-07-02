import axios from "axios";

const initialState = {
  posts: []
};

const GET_POSTS = "GET_POSTS";

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS + "_FULFILLED":
      return { ...state, posts: action.payload.data };
    default:
      return state;
  }
}

export function getAllPosts() {
  return {
    type: GET_POSTS,
    payload: axios.get("/api/posts")
  };
}
