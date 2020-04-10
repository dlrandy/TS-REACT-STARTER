import PollsActionTypes from '@Actions/Polls/type';
import { handleActions } from 'redux-actions';


const pollsReducer = handleActions(
  {
    [PollsActionTypes.REQUESTED_ALL_POLLS]: (state: any) => ({ ...state }),
  },
  {},
);

export default pollsReducer;
