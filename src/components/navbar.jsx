import React,{useState} from 'react'
import { NavLink } from "react-router-dom"
import styled from './navbar.module.css'
import { useAuthentication } from '../hooks/useAuthentication'
import { useAuthValue } from '../context/AuthContext'
import { FaBars } from "react-icons/fa"
import  {GiCancel} from 'react-icons/gi'



function navbar() {
 const { user } = useAuthValue()
 const { logout } = useAuthentication()
 const [sidebar, setSedibar] = useState(true)
  
const showSidebar = ()=>{
  return setSedibar(!sidebar)
}


  return (
    <nav className={styled.navbar}>
      
        <NavLink to="/" className={styled.brand}>
            Mr. <span>ROBOT</span>
        </NavLink>
        <ul className={styled.links_list}>
            <li>
            <NavLink to="/" className={({isActive})=>(isActive? styled.active : "")}> Home </NavLink>
            </li>
                {!user && (
                  <>
                  <li>
                  <NavLink to="/login" className={({isActive})=>(isActive? styled.active : "")}> entrar </NavLink>
                  </li>

                  <li>
                  <NavLink to="/register" className={({isActive})=>(isActive? styled.active : "")}> Cadastrar </NavLink>
                  </li>
                  </>
                )}

                {user && (
                  <>
                  <li>
                  <NavLink to="/posts/create" className={({isActive})=>(isActive? styled.active : "")}> 
                  Novo post 
                  </NavLink>
                  </li>

                  <li>
                  <NavLink to="/deshboard" className={({isActive})=>(isActive? styled.active : "")}> 
                    Deshboard 
                  </NavLink>
                  </li>
                  </>
                )}
            <li>
                <NavLink to="/about" className={({isActive})=>(isActive? styled.active : "")}> sobre </NavLink>
            </li>
            {user && (
              <li>
                <button onClick={logout}>Sair</button>
              </li>
            )}
        </ul>
        {sidebar === true? (
          <FaBars className={styled.icons} onClick={showSidebar}/>
        ):
        (
          <div className={styled.sidebar}>
            <GiCancel className={styled.icons} onClick={showSidebar} />
            <ul>
            <li onClick={showSidebar}>
            <NavLink to="/"  className={({isActive})=>(isActive? styled.active : "")}> Home </NavLink>
            </li>

                {!user && (
                  <>
                  <li onClick={showSidebar}>
                  <NavLink to="/login"  className={({isActive})=>(isActive? styled.active : "")}> entrar </NavLink>
                  </li>

                  <li onClick={showSidebar} >
                  <NavLink to="/register"  className={({isActive})=>(isActive? styled.active : "")}> Cadastrar </NavLink>
                  </li>
                  </>
                )}

                {user && (
                  <>
                  <li onClick={showSidebar}>
                  <NavLink to="/posts/create"  className={({isActive})=>(isActive? styled.active : "")}> 
                  Novo post 
                  </NavLink>
                  </li>

                  <li onClick={showSidebar} >
                  <NavLink to="/deshboard" className={({isActive})=>(isActive? styled.active : "")}> 
                    Deshboard 
                  </NavLink>
                  </li>
                  </>
                )}
            <li onClick={showSidebar}>
                <NavLink to="/about"   className={({isActive})=>(isActive? styled.active : "")}> sobre </NavLink>
            </li>
            {user && (
              <li onClick={showSidebar}>
                <button  onClick={logout}>Sair</button>
              </li>
            )}
        </ul>
          </div>
         )}

    </nav>
 
  )
}

export default navbar