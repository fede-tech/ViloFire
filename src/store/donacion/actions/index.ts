import { ActionType } from 'types';

export const getDonacionList = () => {
  return {
    type: ActionType.DONACION_GET_LIST_REQUEST,
  }
}

export const getDonacionListSuccess = (payload: Array<any>) => {
  return {
    type: ActionType.DONACION_GET_LIST_SUCCESS,
    payload,
  }
}

export const getDonacionListFailure = (payload: string) => {
  return {
    type: ActionType.DONACION_GET_LIST_FAILURE,
    payload,
  }
}

