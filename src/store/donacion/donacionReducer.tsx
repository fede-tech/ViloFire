import {
  ActionType, FieldErrors,
} from 'types';
import createReducer from 'store/config/createReducer';
import { getDonacionListSuccessReducer, getDonacionListFailureReducer } from './reducers';

export interface DonacionReducerType {
  donacionList: Array<any>;
  error?: any;
}

export const defaultState: DonacionReducerType = {
  donacionList: [],
  error: undefined,
}

export const donacionReducer = createReducer<DonacionReducerType>(defaultState, {
  [ActionType.DONACION_GET_LIST_SUCCESS]: getDonacionListSuccessReducer,
  [ActionType.DONACION_GET_LIST_FAILURE]: getDonacionListFailureReducer,
});
