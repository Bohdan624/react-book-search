// @flow
import { BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';
import type { Observable } from 'rxjs';
import typeof { ajax as AjaxCreationMethod } from 'rxjs/ajax';
import { epics } from './dummy';

export const epic$ = new BehaviorSubject(combineEpics(epics));

export const rootEpic = (
  action$: Observable<any>,
  state$: Observable<any>,
  { ajax }: { ajax: AjaxCreationMethod }
) => epic$.pipe(mergeMap(epic => epic(action$, state$, { ajax })));
