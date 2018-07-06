import axios from "axios";
import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from "constants";

const initialState = {
  user: {},
  posts: [],
  token: "",
  errors: [],
  message: {}
};

const SET_USER = "SET_USER";
const GET_POSTS = "GET_POSTS";
const SET_TOKEN = "SET_TOKEN";
const SET_LOGIN = "SET_LOGIN";
const ADD_TO_PROFILE = "ADD_TO_PROFILE";
const DELETE_FROM_PROFILE = "DELETE_FROM_PROFILE";
const EDIT_PROFILE_POST = "EDIT_PROFILE_POST";
const USER_SIGN_UP = "USER_SIGN_UP";
const ADD_FLASH_MESSAGE = "ADD_FLASH_MESSAGE";

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER + "_FULFILLED":
      console.log(action.payload.data[0]);
      return { ...state, user: action.payload.data[0] };
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
    case USER_SIGN_UP + "_FULFILLED":
      return { ...state, errors: action.payload.data };
    case ADD_FLASH_MESSAGE:
      return { ...state, message: action.payload };
    default:
      return state;
  }
}

export function setUser(user) {
  return {
    type: SET_USER,
    payload: axios.post("/api/users", user)
  };
}

export function getAllPosts() {
  return {
    type: GET_POSTS,
    payload: axios.get("/api/posts")
  };
}

export function addToProfile(data) {
  console.log(data);
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
  console.log(userInfo);

  return {
    type: USER_SIGN_UP,
    payload: axios.post("/api/users", { userInfo })
  };
}

export function addFlashMessage(message) {
  return {
    type: ADD_FLASH_MESSAGE,
    payload: message
  };
}
