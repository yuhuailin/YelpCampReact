import { SUGGESTION } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case SUGGESTION:
      return action.payload;
    default:
      return state;
  }
}
