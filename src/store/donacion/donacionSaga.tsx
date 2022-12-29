import { fork } from 'redux-saga/effects';
import { donacionWatcher } from './sagas';

export default [
  fork(donacionWatcher),
];
