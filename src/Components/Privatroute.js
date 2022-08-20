import React from "react";
import {Outlet, Navigate} from 'react-router-dom'
import { UserAuth } from "../Context/AuthContext"

export default function PrivateRoute(){
    const {currentUser}=UserAuth()
    return(
        
            currentUser? <Outlet/> : <Navigate to='/login'/>
            
            
        
    )
}