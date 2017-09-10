import { FETCH_CAMPGROUNDS } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_CAMPGROUNDS:
      return action.payload.data;
    default:
      return state;
  }
}
