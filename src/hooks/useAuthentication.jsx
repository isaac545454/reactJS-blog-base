import {db } from "../firebase/config"
import React, {useEffect, useState } from 'react'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from "firebase/auth"

export const useAuthentication = ()=>{
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    function checkFisCancelled(){
        if(cancelled){
            return
        }

    }

    const createUser = async  (data)=>{
        checkFisCancelled()

        setLoading(true)
        setError(null)


        try {
        
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })
              setLoading(false)

            return user

        } catch (e) {
             console.log(e.message);
             console.log(typeof e.message);
             let systemErrormessage

             if(e.message.includes("password")){
                systemErrormessage = "a senha precisa conter pelo menos 6 caracteres "
             }else if(e.message.includes("email-already")){
                systemErrormessage = "E-mail já cadastrado."
             }else{
                systemErrormessage = "ocorreu um erro, por favor tente mais tarde."
             }
             setLoading(false)
             setError(systemErrormessage)
        }
      
    }

    //logault 
    const logout = ()=>{
        checkFisCancelled()
        signOut(auth)
    }

    //login - sogn out
     const login = async (data)=>{
         checkFisCancelled()
         setLoading(true)
         setError(false)

         try {

            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false)
            
         } catch (e) {
              let systemErrormessage

             if(e.message.includes("user-not-founf")){
                    systemErrormessage = "usuario não encontrado"
             }else if(e.message.includes('wrong-password')){
                    systemErrormessage = "senha incorreta"
             }else{
                systemErrormessage = "ocorreu um erro, tente mais tarde"
             }

             setError(systemErrormessage)
             setLoading(false)
            
         }
     }

    useEffect(()=>{
        return()=>setCancelled(true)
    }, [])

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    }


}
