/* Valve1: false,
    Valve2: false,
    Valve3: false,
    Valve4: false,
    Valve5: false,
    Valve6: false,
    Valve7: false,
    Humidifer1: false,
    Humidifer2: false,
    Lamp1: false,
    Lamp2: false,
    Peristaltic1: false,
    Peristaltic2: false,
    WaterPump1: false,
    WaterPump2: false,
    Fan: false,
    Feeder: false,
    AirPump: false,
    StateControl: 'Manual'

*/


const INITIAL_STATE = {
    text: 'hola React Redux',
    showBar: false,
    statePage: 'login',
    stateVariable: '',
    stateControl: 'Automatico',
    stateActuator: {
        Valve1: false,
        Valve2: false,
        ValveIn: false,
        Humidifer1: false,
        Humidifer2: false,
        Lamp1: false,
        Lamp2: false,
        Peristaltic1: false,
        Peristaltic2: false,
        WaterPump1: false,
        WaterPump2: false,
        Fan: false,
        Feeder: false,
        AirPump: false,
        SensoresVcc: false},
    DataSensors :{}

};

const uiReducer= (state = INITIAL_STATE,action) => {
    switch (action.type) {
        case 'SET_SHOW_HEADER_BAR':
            return {
                ...state,
                showBar: action.payload.showBar
            };
        case 'SET_VARIABLE':
                return {
                    ...state,
                    stateVariable: action.payload.stateVariable
                };
        case 'SET_STATE':
                return {
                    ...state,
                    statePage: action.payload.statePage
                };
        case 'SET_CONTROL':
            return {
                ...state,
                stateControl: action.payload.stateControl
            };     
        case 'SET_ACTUATORS':
            return {
                ...state,
                stateActuator: action.payload.stateActuator
            };    
            
        default:
            return state;
    }
}

export default uiReducer;