import { INCREMNT } from './actions';
import {tassign} from 'tassign';
 
export interface IAppState {
counter:  number;
}

export const initialState: IAppState = {
    counter: 0
};


export function rootReducer(state: IAppState, action): IAppState {
    switch (action.type) {
    case INCREMNT : return tassign(state, {counter: state.counter + 1}); // to avoid mutating of state. // like Object.assign()
    }
    return state;
}


