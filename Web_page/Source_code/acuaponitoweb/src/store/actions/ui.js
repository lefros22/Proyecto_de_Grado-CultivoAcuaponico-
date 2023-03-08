export const setShowHBar = (showBar) => (dispatch)=> {
    dispatch({
        type: 'SET_SHOW_HEADER_BAR',
        payload: {showBar },
    
    });
}
export const setVariable = (stateVariable) => (dispatch)=> {
    dispatch({
        type: 'SET_VARIABLE',
        payload: {stateVariable },
    
    });
}
export const setState = (statePage) => (dispatch)=> {
    dispatch({
        type: 'SET_STATE',
        payload: {statePage },
    
    });
}

export const setControl = (stateControl) => (dispatch)=> {
    dispatch({
        type: 'SET_CONTROL',
        payload: {stateControl },
    
    });
}

export const setActuator = (stateActuator) => (dispatch)=> {
    dispatch({
        type: 'SET_ACTUATORS',
        payload: {stateActuator },
    
    });
}