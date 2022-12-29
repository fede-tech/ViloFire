import { BasicReducerType } from 'store/app/basicReducer';
import { DonacionReducerType } from 'store/donacion/donacionReducer';

export interface RootState {
    basic: BasicReducerType;
    donacion: DonacionReducerType;
}
