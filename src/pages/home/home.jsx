import React from 'react'
//csss 
import styles from './home.module.css'

//hooks 
import {useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'

//components 
import PostsDetail from '../../components/postsDetail'





function home() {
  const navigate = useNavigate() 
 const [query, setQuery] = useState("")
 

 const {documents: posts, loading, error} = useFetchDocuments("posts")

 const handleSubmit = (e)=>{
  e.preventDefault()

  if(query){
    return navigate(`/search?q=${query}`)
  }
 }

  return (
    <div className={styles.home}>   
        
        <h1>veja nosssos posts mais recentes</h1>

        <form onSubmit={handleSubmit} className={styles.search_form}>

          <input 
          type="text" 
          placeholder="ou busque por tags..." 
          onChange={(e)=> setQuery(e.target.value)}
           />
          <button className="btn btn-dark" type="submit">Pesquisar</button>

        </form>
        <div >
          {posts && posts.map((post)=>(
            <PostsDetail key={post.id} post={post} />
          ))}
          {posts && posts.length === 0 && (
            <div className={styles.noposts}>
              <p>não foram encontrados posts</p>
              <Link to="posts/create" className="btn">criar primeiro post</Link> 
            </div>
          )}
        </div>
    </div>
  )
}

export default home