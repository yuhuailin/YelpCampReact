import axios from "axios";
import { FETCH_USER, FETCH_CAMPGROUND, FETCH_CAMPGROUNDS, FLASH_MESSAGE, USER_PROFILE } from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res });
};

export const fetchSomeUser = (id) => async dispatch => {
  const res = await axios.get("/api/users/" + id);
  dispatch({ type: USER_PROFILE, payload: res });
};

export const fetchSomeCampground = (id) => async dispatch => {
  const res = await axios.get("/api/campgrounds/" + id);
  dispatch({ type: FETCH_CAMPGROUND, payload: res });
};

export const submitSearch = value => async dispatch => {
  const res = await axios.get("/api/campgrounds?search=" + value);
  dispatch({ type: FETCH_CAMPGROUNDS, payload: res });
};

export const fetchCampgrounds = () => async dispatch => {
  const res = await axios.get("/api/campgrounds/all");
  dispatch({ type: FETCH_CAMPGROUNDS, payload: res });
};

export const deleteCampground= (id, history) => async dispatch => {
  const res = await axios.get(`/api/campgrounds/${id}/delete`);
  history.push('/campgrounds');
  dispatch({ type: FETCH_CAMPGROUNDS, payload: res });
};

export const submitCampground = (values, history) => async dispatch => {
  try {
    const res = await axios.post("/api/campgrounds", values);
    history.push("/campgrounds");
    dispatch({ type: FETCH_CAMPGROUNDS, payload: res });
    dispatch({ type: FLASH_MESSAGE, payload: {msg:"Successfully Created A New Campground!", className: "alert-success"} });
  } catch (err) {
    history.push("/login");
    dispatch({ type: FLASH_MESSAGE, payload: err.response.data });
  }
};

export const editCampground = (campground, history) => async dispatch => {
    const res = await axios.post(`/api/campgrounds/${campground._id}/edit`, {'campground':campground});
    history.push(`/campgrounds/${campground._id}`);
    dispatch({ type: FETCH_CAMPGROUND, payload: res });
    dispatch({ type: FLASH_MESSAGE, payload: {msg:"Successful Edit!", className: "alert-success"} });

};

export const submitComment = (campId, comment, history) => async dispatch => {
  try{
    const res = await axios.post(`/api/campgrounds/${campId}/comments/new`, {'text': comment});
    dispatch({ type: FETCH_CAMPGROUND, payload: res });
  } catch(err) {
    history.push("/login");
    dispatch({ type: FLASH_MESSAGE, payload: err.response.data });
  }
};

export const editComment = (campId, commentId, text, history) => async dispatch => {
  const res = await axios.post(`/api/campgrounds/${campId}/comments/${commentId}`, {'text': text});
  dispatch({ type: FETCH_CAMPGROUND, payload: res });
};

export const deleteComment = (campId, commentId) => async dispatch => {
  const res = await axios.get(`/api/campgrounds/${campId}/comments/${commentId}/delete`);
  dispatch({ type: FETCH_CAMPGROUND, payload: res });
};

export const login = (values, history) => async dispatch => {
  try {
    const res = await axios.post("/api/login", values);
    history.push("/campgrounds");
    dispatch({ type: FETCH_USER, payload: res });
    dispatch({ type: FLASH_MESSAGE, payload: {msg:"Successfully Logged In!", className: "alert-success"} });
  } catch (err) {
    history.push("/login");
    dispatch({ type: FLASH_MESSAGE, payload: err.response.data });
  }
};

export const logout = () => async dispatch => {
  const res = await axios.get("/api/logout");
  dispatch({ type: FETCH_USER, payload: res });
  dispatch({ type: FLASH_MESSAGE, payload: {msg:"Logged You Out!", className: "alert-success"} });
};

export const register = (values, history) => async dispatch => {
  try {
    const res = await axios.post("/api/register", values);
    history.go(-1);
    dispatch({ type: FETCH_USER, payload: res });
    dispatch({ type: FLASH_MESSAGE, payload: {msg:"Successfully Signed Up!", className: "alert-success"} });
  } catch (err) {
    history.push("/login");
    dispatch({ type: FLASH_MESSAGE, payload: err.response.data });
  }
};

export const closeFlash = () => async dispatch => {
  dispatch({ type: FLASH_MESSAGE, payload: null });
};