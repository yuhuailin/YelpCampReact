import { USER_PROFILE } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case USER_PROFILE:
      return action.payload.data;
    default:
      return state;
  }
}
