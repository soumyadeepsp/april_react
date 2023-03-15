import { useState } from "react";
import AuthContext from "./authContext";

const AuthState = (props) => {
    const [user, setUser] = useState({id: undefined, name: undefined});
    return (
        <AuthContext.Provider value={{user, setUser}}>
            {props.children}
            {/* this denotes the entire apps.js */}
        </AuthContext.Provider>
    )
}
export default AuthState;