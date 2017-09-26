import axios from "axios";
import { FETCH_USER, FETCH_CAMPGROUND, FETCH_CAMPGROUNDS, FLASH_MESSAGE, USER_PROFILE,SUGGESTION } from "./types";

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

export const clearSomeCampground = () => async dispatch => {
  dispatch({ type: FETCH_CAMPGROUND, payload: {'data':null} });
};

export const submitSearch = value => async dispatch => {
  const res = await axios.get("/api/campgrounds?search=" + value);
  dispatch({ type: FETCH_CAMPGROUNDS, payload: res });
};

export const submitIndexSearch = value => async dispatch => {
  const res = await axios.get("/api/campgroundsIndex?search=" + value);
  dispatch({ type: FETCH_CAMPGROUNDS, payload: res });
  dispatch({ type: SUGGESTION, payload: null });
};

export const suggest = value => async dispatch => {
  if (value === "") {
    dispatch({ type: SUGGESTION, payload: null });
  } else {
    var config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Ocp-Apim-Subscription-Key": "7ad6daf8e5494e47bb865c62f30b5100"
      }
    };
    var body = "text=" + value;
    var result = await axios
      .post(
        "https://api.cognitive.microsoft.com/bing/v5.0/spellcheck/?mode=spell",
        body,
        config
    );
    var length = result.data.flaggedTokens.length;

    var results = "";
    for (var i = 0; i < length; i++) {
      var query = result.data.flaggedTokens[i].suggestions[0].suggestion;
      results += query;
      if (i !== length - 1) {
        results += ' ';
      }
    }
    if (results === "") {
      dispatch({ type: SUGGESTION, payload: null });
    } else {
      dispatch({ type: SUGGESTION, payload: results });
    }
  }
}

export const fetchCampgrounds = () => async dispatch => {
  const res = await axios.get("/api/campgrounds/all");
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

export const deleteCampground= (id, history) => async dispatch => {
  const res = await axios.post(`/api/campgrounds/${id}?_method=DELETE`);
  history.push('/campgrounds');
  dispatch({ type: FETCH_CAMPGROUNDS, payload: res });
  dispatch({ type: FLASH_MESSAGE, payload: {msg:"Successful Deletion!", className: "alert-success"} });
};

export const editCampground = (campground, history) => async dispatch => {
    const res = await axios.post(`/api/campgrounds/${campground._id}?_method=PUT`, {'campground':campground});
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
  const res = await axios.post(`/api/campgrounds/${campId}/comments/${commentId}?_method=PUT`, {'text': text});
  dispatch({ type: FETCH_CAMPGROUND, payload: res });
};

export const deleteComment = (campId, commentId) => async dispatch => {
  const res = await axios.post(`/api/campgrounds/${campId}/comments/${commentId}?_method=DELETE`);
  dispatch({ type: FETCH_CAMPGROUND, payload: res });
};

export const loginError = (history) => async dispatch => {
  history.push('/login');
  dispatch({ type: FLASH_MESSAGE, payload: {msg: "You Must Log In!", className: "alert-danger"} });
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
