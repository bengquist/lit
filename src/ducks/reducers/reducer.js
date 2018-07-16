import axios from "axios";

const initialState = {
  user: {},
  profilePosts: [],
  timelinePosts: [],
  token: "",
  users: [],
  alreadyLiked: false
};

const SET_USER = "SET_USER";
const GET_PROFILE_POSTS = "GET_PROFILE_POSTS";
const GET_TIMELINE_POSTS = "GET_TIMELINE_POSTS";
const SET_TOKEN = "SET_TOKEN";
const SET_LOGIN = "SET_LOGIN";
const ADD_TO_PROFILE = "ADD_TO_PROFILE";
const DELETE_FROM_PROFILE = "DELETE_FROM_PROFILE";
const EDIT_PROFILE_POST = "EDIT_PROFILE_POST";
const SEARCH_USERS = "SEARCH_USERS";
const FOLLOW_USER = "FOLLOW_USER";
const UNFOLLOW_USER = "UNFOLLOW_USER";
const LIKE_POST = "LIKE_POST";

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER + "_FULFILLED":
      return { ...state, user: action.payload.data[0] };
    case GET_PROFILE_POSTS + "_FULFILLED":
      return { ...state, profilePosts: action.payload.data };
    case GET_TIMELINE_POSTS + "_FULFILLED":
      return { ...state, timelinePosts: action.payload.data };
    case SET_LOGIN:
      return { ...state, loggedIn: action.payload };
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case ADD_TO_PROFILE + "_FULFILLED":
      return { ...state, profilePosts: action.payload.data };
    case DELETE_FROM_PROFILE + "_FULFILLED":
      return { ...state, profilePosts: action.payload.data };
    case EDIT_PROFILE_POST + "_FULFILLED":
      return { ...state, profilePosts: action.payload.data };
    case SEARCH_USERS + "_FULFILLED":
      return { ...state, users: action.payload.data };
    case SEARCH_USERS + "_REJECTED":
      return { ...state, users: [] };
    case FOLLOW_USER + "_FULFILLED":
      return { ...state };
    case UNFOLLOW_USER + "_FULFILLED":
      return { ...state, timelinePosts: action.payload.data };
    case LIKE_POST + "_FULFILLED":
      console.log(action.payload.data);
      return { ...state, alreadyLiked: action.payload.data };
    default:
      return state;
  }
}

// users

export function setUser(user) {
  return {
    type: SET_USER,
    payload: axios.post("/api/users", user)
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
// profile

export function getProfilePosts(userID) {
  return {
    type: GET_PROFILE_POSTS,
    payload: axios.get(`/api/posts/${userID}`)
  };
}

export function addToProfile(data) {
  return {
    type: ADD_TO_PROFILE,
    payload: axios.post("/api/profile/posts", data)
  };
}

export function deleteFromProfile(postID, userID) {
  return {
    type: DELETE_FROM_PROFILE,
    payload: axios.delete(`/api/profile/post/${postID}/${userID}`)
  };
}

export function editProfilePost(postID, comment, userID) {
  return {
    type: EDIT_PROFILE_POST,
    payload: axios.put(`/api/profile/post/${postID}`, { comment, userID })
  };
}

// timeline

export function getTimelinePosts(userID) {
  return {
    type: GET_TIMELINE_POSTS,
    payload: axios.get(`/api/timeline/posts/${userID}`)
  };
}

export function likePost(userID, postID) {
  return {
    type: LIKE_POST,
    payload: axios.put(`/api/posts/${postID}`, { userID })
  };
}

// discover

export function searchUsers(user) {
  return {
    type: SEARCH_USERS,
    payload: axios.get(`/api/users/${user}`)
  };
}

export function followUser(userID, followID) {
  return {
    type: FOLLOW_USER,
    payload: axios.post(`/api/users/${userID}`, { followID })
  };
}

export function unfollowUser(userID, unfollowID) {
  console.log(userID, unfollowID);
  return {
    type: UNFOLLOW_USER,
    payload: axios.delete(`/api/users/${userID}/${unfollowID}`)
  };
}
