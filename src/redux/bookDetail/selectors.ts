import { createSelector } from 'reselect';
import { State } from '../store';

/*
  This is too simple to need reselect.
  I'm just using reselect to demonstrate how / where it would be used if necessary
*/

export default createSelector(
  (state: State) => (state.details ? state.details.bookDetail : null),
  bookDetail => bookDetail
);
