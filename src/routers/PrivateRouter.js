import { Route, Navigate } from "react-router-dom";

export const PrivateRouter = ({children,isAuthenticated})=>{
    if(isAuthenticated){
        return children  
    }
    else if(!isAuthenticated){
        return <Navigate to="/login" />
    }
}

export default PrivateRouter

