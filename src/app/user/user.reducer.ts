import * as fromRoot from '../state/app.state';

export interface State extends fromRoot.State {
    user : UserState;
}

export interface UserState {
    maskUserName: boolean;
}

const initialState : UserState = {
    maskUserName : false
};


export function reducer(state = initialState, action) : UserState{

    switch(action.type) {
        case 'MASK_USER_NAME': 
        console.log('existing state'+ JSON.stringify(state));
        console.log('payload'+ action.payload);
            return {
                ...state,
                maskUserName: action.payload
          };

        default:
            return state;
    }
}