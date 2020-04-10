
import PollActionTypes from '@Actions/Polls/type';
import { ofType } from 'redux-observable';
import { map, switchMap } from 'rxjs/operators';
import {
  getAllPolls,
} from '@Networks/polls';
import { from } from 'rxjs';


export const fetchAllPolls = (action$: any):any => action$.pipe(
  ofType(PollActionTypes.REQUESTED_ALL_POLLS),
  switchMap(() => from(getAllPolls()).pipe(
    map(({ response }) => (response)),
  )),
);


export default [fetchAllPolls];
