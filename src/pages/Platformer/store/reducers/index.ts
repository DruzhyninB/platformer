import * as Actions from '../actions';

type PlatformerReducerType = {
    width: number,
    height: number,
}

const initialState: PlatformerReducerType = {
    width: 0,
    height: 0,
};

const platformerReducer = function ( state = initialState, action: Actions.PlatformerActionsType ): PlatformerReducerType {
    switch ( action.type ) {
        case Actions.SET_SIZES:
            {
                return {
                    ...state,
                    ...action.payload
                };
            }
        default:
            {
                return state;
            }
    }
};

export default platformerReducer;