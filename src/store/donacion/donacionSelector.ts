import { RootState } from 'types';
import { DonacionReducerType } from './donacionReducer';
import { createSelector } from 'reselect';

export const selectDonacionState = (state: RootState, props?: any): DonacionReducerType => {
  return state.donacion;
};

export const selectDonacionList = createSelector(
  [ selectDonacionState ],
  (donacionState) => donacionState.donacionList,
);

export const selectDonacionError = createSelector(
  [ selectDonacionState ],
  (donacionState) => donacionState.error,
);
