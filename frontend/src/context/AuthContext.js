import { createContext, useReducer } from "react";

const initialState = {
    business: JSON.parse(localStorage.getItem('business')) || null,
    token: localStorage.getItem('token') || null
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('business', JSON.stringify(action.payload.business));
            return {
                business: action.payload.business,
                token: action.payload.token
            };

        case 'LOGOUT':
            localStorage.removeItem('token');
            localStorage.removeItem('business');
            return {
                business: null,
                token: null
            }
        default:
            return state;

    }
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )

}