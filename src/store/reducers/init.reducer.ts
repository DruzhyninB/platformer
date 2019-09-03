import * as Actions from '../actions';

type initialPropsReducerType = {
    scale:number,
    maxStep:number
}
const initialState: initialPropsReducerType = {
    scale: 20,
    maxStep: 0.05
};

const initialPropsReducer = function ( state = initialState, action: Actions.CounterActionsTypes ): initialPropsReducerType {
    switch ( action.type ) {
        default:
            {
                return state;
            }
    }
};

export default initialPropsReducer;