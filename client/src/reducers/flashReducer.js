import { FLASH_MESSAGE } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FLASH_MESSAGE:
      return action.payload;
    default:
      return state;
  }
}
