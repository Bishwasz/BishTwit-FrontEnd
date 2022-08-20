import React, { useContext, useState, useEffect, createContext } from "react"
import { auth } from "../firebase"

import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword ,signOut} from "firebase/auth";

export const FuncCon= createContext()


export  function AuthProvider({children}){
    const [currentUser, setCurrentUser]=useState({})
    const [token, setToken]=useState('')

    const createUser=(email, password)=>{

      createUserWithEmailAndPassword(auth,email,password).then(cred =>{
        loginUser(email, password)

      })
    }
    const loginUser=(email, password)=>{
      return signInWithEmailAndPassword(auth, email, password)
    }

    const logout=()=>{
      return signOut(auth)
    }

    useEffect(()=>{
      const unsus=onAuthStateChanged(auth,(currentUser)=>{
        setCurrentUser(currentUser)
        if (currentUser){
        currentUser.getIdToken().then((token)=>{
          setToken(token)  
        })}
        else{ setToken("")}
      })
      return unsus
    },[])
    return(
      <FuncCon.Provider value={{createUser, loginUser, token, currentUser,logout,setToken}}>
          {children}
      </FuncCon.Provider>
    )
}
export const UserAuth=()=>{
  return useContext(FuncCon)
}