import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import alertContext from './alertContext';
import alertReducer from './alertReducer';
import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types';

const AuthState = props => {

    const initialState = [];

    const [state, dispatch] = useReducer(alertReducer, initialState);

    // SET alert 
    const setAlert = (msg, type, timeout = 5000) => {
        let id = uuidv4();
        dispatch({
            type: SET_ALERT,
            payload: { msg, type, id }
        });

        setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
    }


    return (
        <alertContext.Provider 
            value={{
                alerts: state,
                setAlert
            }}
        >
            {props.children}
        </alertContext.Provider>
    )

}

export default AuthState;