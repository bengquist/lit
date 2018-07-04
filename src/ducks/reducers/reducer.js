import axios from "axios";

const initialState = {
  posts: [],
  token: ""
};

const GET_POSTS = "GET_POSTS";
const SET_TOKEN = "SET_TOKEN";
const SET_LOGIN = "SET_LOGIN";
const ADD_TO_PROFILE = "ADD_TO_PROFILE";
const DELETE_FROM_PROFILE = "DELETE_FROM_PROFILE";
const EDIT_PROFILE_POST = "EDIT_PROFILE_POST";
const USER_SIGN_UP = "USER_SIGN_UP";

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
    case DELETE_FROM_PROFILE + "_FULFILLED":
      return { ...state, posts: action.payload.data };
    case EDIT_PROFILE_POST + "_FULFILLED":
      return { ...state, posts: action.payload.data };
    case USER_SIGN_UP:
      return { ...state };
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
    payload: axios.post("/api/profileposts", data)
  };
}

export function deleteFromProfile(postID) {
  return {
    type: DELETE_FROM_PROFILE,
    payload: axios.delete(`/api/profilepost/${postID}`)
  };
}

export function editProfilePost(postID, comment) {
  return {
    type: EDIT_PROFILE_POST,
    payload: axios.put(`/api/profilepost${postID}`, { comment })
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

export function userSignupRequest(userInfo) {
  return {
    type: USER_SIGN_UP,
    payload: axios.post("/api/users", { userInfo })
  };
}
