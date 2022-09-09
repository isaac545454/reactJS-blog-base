import React from 'react'
import styles from "./abolt.module.css"
import {Link} from 'react-router-dom'

function abolt() {
  return (
    <div className={styles.about}>
     <h2>sobre o blog de mr.<span>robot</span></h2>
      <p>projeto com reactJS E firebase</p>
      <Link to="/posts/create" className='btn'>criar post</Link>
    </div>
    
  )
}

export default abolt