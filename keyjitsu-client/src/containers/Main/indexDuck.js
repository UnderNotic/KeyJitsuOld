const TOGGLE = "TOGGLE";

export default function reducer(state = { isToggled: false }, action = {}){
    switch(action.type){
        case TOGGLE:
            return {...state, isToggled: !state.isToggled};
        default:
            return state;
    }
}

export function toggle(){
    return {
        type: TOGGLE
    }
}