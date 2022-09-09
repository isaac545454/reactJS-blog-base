import React from 'react'

//style
import styles from './search.module.css'

//hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery'

import { Link } from 'react-router-dom'


//components
import PostsDetail from '../../components/postsDetail'

function Search() {
const query = useQuery()
const search = query.get("q")

const {documents: posts} = useFetchDocuments("posts", search)

  return (
    <div className={styles.container_search}>
       <h1>Search: {search}</h1>
        {<div >
         {posts && posts.length === 0 && (
            <div className={styles.text}>
                <p>não foram encontrados posts a partir da sua busca... </p>
                <Link to="/" className="btn btn-dark" >voltar</Link>
            </div>
         )}
          {posts && posts.map((post)=><PostsDetail key={post.id} post={post} />)}    
        </div>}                                                                                                                                            
    </div>
  )
}

export default Search