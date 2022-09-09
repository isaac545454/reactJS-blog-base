import React from 'react'
import styled from "./login.module.css"
import {useState, useEffect } from "react"
import {useAuthentication} from "../../hooks/useAuthentication"

function login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const {login, error: authError, loading} = useAuthentication()


    const handleSubmit = async (e)=>{
        e.preventDefault()
          setError("")

        const user = {
            email,
            password
        }
  

        const res = await login(user)
     
            console.log(res)

    }

    useEffect(()=>{
        if(authError){
            setError(authError)
        }
    }, [authError])


  return (
    <div className={styled.login}>
             <h1>Entrar</h1>
        <p>faça login para poder  utilizar o sistema</p>
        <form onSubmit={handleSubmit}>
            
            <label>
                <span>E-mail:</span>
                <input 
                    type="email"
                    name="email"
                    required
                    placeholder="E-mail do usuário"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
            </label>
            <label>
                <span>senha:</span>
                <input 
                    type="password"
                    name="password"
                    required
                    placeholder="insira sua senha"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
            </label>
              <label>
                
            </label>
            {!loading &&<button className="btn">entrar</button>}
            {loading &&<button className="btn" disabled>aguarde...</button>}

            {error && <p className="error">{error}</p>}
        </form>
    </div>
  )
}

export default login