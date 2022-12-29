import { Action } from 'types';
import { DonacionReducerType } from '../donacionReducer';

export const getDonacionListSuccessReducer = (
  state: DonacionReducerType,
  { payload }: Action<Array<any>>,
): DonacionReducerType => {
  return {
    ...state,
    donacionList: payload,
    error: undefined,
  };
};

export const getDonacionListFailureReducer = (
  state: DonacionReducerType,
  { payload }: Action<string>,
): DonacionReducerType => {
  return {
    ...state,
    donacionList: [],
    error: payload,
  };
};
