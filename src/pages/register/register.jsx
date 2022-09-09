import React from 'react'
import styled from "./register.module.css"
import {useState, useEffect } from "react"
import {useAuthentication} from "../../hooks/useAuthentication"
function register() {
    const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmePassword] = useState("")
    const [error, setError] = useState("")

    const {createUser, error: authError, loading} = useAuthentication()


    const handleSubmit = async (e)=>{
        e.preventDefault()
          setError("")

        const user = {
            displayName,
            email,
            password
        }
        if(password !== confirmPassword){
            setError("as senhas precisa ser iguais!")
        }

        const res = await createUser(user)
     
            console.log(res)

    }

    useEffect(()=>{
        if(authError){
            setError(authError)
        }
    }, [authError])


  return (
       <div className={styled.register}>
        <h1>Cadastre-se para postar</h1>
        <p>crie seu usuário e compartilhe desse delirio</p>
        <form onSubmit={handleSubmit}>
            <label>
                <span>nome:</span>
                <input 
                    type="text"
                    name="displayname"
                    required
                    placeholder="nome do usuário"
                    value={displayName}
                    onChange={(e)=>setDisplayName(e.target.value)}
                />
            </label>
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
                <span>confirmação de senha:</span>
                <input 
                    type="password"
                    name="confirmPassword"
                    required
                    placeholder="confirme a sua senha"
                    value={confirmPassword}
                    onChange={(e)=>setConfirmePassword(e.target.value)}
                />
            </label>
            {!loading &&<button className="btn">cadastrar</button>}
            {loading &&<button className="btn" disabled>aguarde...</button>}

            {error && <p className="error">{error}</p>}
        </form>
    </div>
  )
}

export default register