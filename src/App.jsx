
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom"

//context
import { AuthProvider } from './context/AuthContext'
import { onAuthStateChanged } from 'firebase/auth'

//hooks
import { useState, useEffect } from "react";
import { useAuthentication } from './hooks/useAuthentication'

import Home from './pages/home/home';
import Abolt from './pages/abolt/abolt';
import Login from './pages/login/login';
import CreatePost from './pages/createPost/createPost';
import Deshboard from './pages/deshboard/deshboard'
import Search from './pages/search/search'
import Post from './pages/post/post'
import EditPost from './pages/editPost/editPost'

import Register from "./pages/register/register"
import Navbar from "./components/navbar"
import Footer from "./components/footer"
import './App.css'

function App() {
  const [user, setUser] = useState(undefined)
  const { auth } = useAuthentication()

  const loadingUser = user === undefined


  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      setUser(user)
    })
  }, [auth])

  if(loadingUser){
    return <p>carregando...</p>
  }
 
  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
        <Navbar />
              <div className="container">
                 <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<Abolt />} />
                     <Route path="/search" element={<Search />} />
                    <Route path="posts/:id" element={<Post />} />
                    <Route path="posts/edit/:id" element={user? <EditPost /> : <Navigate to="/login" />} />
                    <Route path="/login" element={!user ? <Login /> : <Navigate to='/' /> } />
                    <Route path="/register" element={!user ? <Register /> : <Navigate to='/' /> } />
                    <Route path="/posts/create" element={user ? <CreatePost /> : <Navigate to='/login' /> }/>
                    <Route path="/deshboard" element={user ? <Deshboard /> : <Navigate to='/login' /> } />
                   
                 </Routes>
              </div>
          <Footer />
        </BrowserRouter>
        </AuthProvider>
    </div>
  )
}

export default App
