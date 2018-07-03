import axios from "axios";

const initialState = {
  posts: [],
  token: ""
};

const GET_POSTS = "GET_POSTS";
const SET_TOKEN = "SET_TOKEN";
const SET_LOGIN = "SET_LOGIN";
const ADD_TO_PROFILE = "ADD_TO_PROFILE";

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS + "_FULFILLED":
      return { ...state, posts: action.payload.data };
    case SET_LOGIN:
      return { ...state, loggedIn: action.payload };
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case ADD_TO_PROFILE + "_FULFILLED":
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

export function addToProfile(data) {
  return {
    type: ADD_TO_PROFILE,
    payload: axios.post("/api/posts", data)
  };
}

export function isLoggedIn(log) {
  return {
    type: SET_LOGIN,
    payload: log
  };
}

export function setToken(token) {
  return {
    type: SET_TOKEN,
    payload: token
  };
}
