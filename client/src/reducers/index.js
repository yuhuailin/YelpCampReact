import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import campgroundsReducer from "./campgroundsReducer";
import campgroundReducer from "./campgroundReducer";
import flashReducer from './flashReducer';
import profileReducer from './profileReducer';
import suggestionReducer from './suggestionReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  campgrounds: campgroundsReducer,
  campground: campgroundReducer,
  flash: flashReducer,
  userprofile: profileReducer,
  suggestion: suggestionReducer
});
