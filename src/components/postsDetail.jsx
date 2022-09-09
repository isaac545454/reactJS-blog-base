import React from 'react'
import { Link } from 'react-router-dom'
import styles from './postsDetails.module.css'

 const postsDetail = ({post})=> {
  return (
    <div className={styles.post_detail}>
       <img src={post.image} alt={post.title} />
       <h2>{post.title}</h2>
      
       <p className={styles.createdby}>{post.createdBy}</p>
       <div className={styles.tags}>
            {post.tagsArray.map((tag)=>(
                <p key={tag}><span>#</span>{tag}</p>
            ))}
       </div>
       <Link to={`/posts/${post.id}`} className={styles.ler}>ler</Link>
    </div>
  )
}
export default postsDetail

