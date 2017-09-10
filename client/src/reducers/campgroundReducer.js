import { FETCH_CAMPGROUND } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_CAMPGROUND:
      return action.payload.data;
    default:
      return state;
  }
}
