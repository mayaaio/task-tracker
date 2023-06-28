import { useState, createContext, useContext, } from "react";
import { config } from "../constants";

const AuthContext = createContext(null)

export const useAuth = () => {
    return useContext(AuthContext)
  }

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()
    const isLoading = currentUser === undefined 
    const URL = config.url;

    const logIn = async ( name ) => {
      await fetch(`${URL}/tasks/login?name=${name}`)
      .then((res) => res.json())
      .then((user) => setCurrentUser(user))
      .catch((err) => {
        console.log(err)
        setCurrentUser(null)
        throw new Error("User " + name + ' not found')
      })
    }
    const logOut = () => setCurrentUser(null)

    const context = {
        isLoading,
        currentUser,
        logIn,
        logOut
      }
    return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}