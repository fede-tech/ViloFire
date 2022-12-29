import { all, put } from "redux-saga/effects";
import { ActionType } from 'types';
import basic from 'store/app/basicSaga';
import donacion from 'store/donacion/donacionSaga';

export default function* rootSaga() {
    yield all([
        ...basic,
        ...donacion,
    ]);
    yield put({
        type: ActionType.INIT_STORE
    });
}
