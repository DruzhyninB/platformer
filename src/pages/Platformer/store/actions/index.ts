import { Dispatch } from 'redux';
import { AppState } from 'store';

export const SET_SIZES = '[PLATFORMER] SET_SIZES';

export interface PlatformerSetSizesAction {
    type: typeof SET_SIZES;
    payload: {
        width?: number,
        height?: number
    }
}

export const setSizes = ( sizes: { width?: number, height?: number } ) => {
    return ( dispatch: Dispatch<PlatformerActionsType>, getState: () => AppState ): void => {
        dispatch( { type: SET_SIZES, payload: sizes } );
    }
};



export type PlatformerActionsType =
    PlatformerSetSizesAction