import { put, takeLatest, select, call, all, delay } from "redux-saga/effects";
import { ActionType } from "types";
import {
  
  apiOptions,
  ApiMethod,
  logger,
  fieldIsEmpty,
  GeocodeApiUrl,
  GeocodeApiKey,
} from "utils";
import { getDonacionListFailure, getDonacionListSuccess } from "../actions";


import donaciones from "donaciones.json";



const getDonaciones = () => {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : donaciones;
};

function* getDonacionList() {
  try {
    delay(500);
    
    const items = getDonaciones();
    
    yield put(getDonacionListSuccess(items));
  } catch (error) {
    yield put(getDonacionListFailure(error));
  }
}

export function* donacionWatcher() {
  yield takeLatest(
    ActionType.DONACION_GET_LIST_REQUEST as any,
    getDonacionList
  );
}
