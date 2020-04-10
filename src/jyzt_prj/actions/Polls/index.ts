/* eslint-disable import/prefer-default-export */
import PollsActionTypes from '@Actions/Polls/type';
import { createAction } from 'redux-actions';


export const requestAllPolls = createAction(PollsActionTypes.REQUESTED_ALL_POLLS, () => ({}));
