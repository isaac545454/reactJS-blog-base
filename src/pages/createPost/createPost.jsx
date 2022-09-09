import React from 'react'
import Styles from './createPost.module.css'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {useAuthValue} from '../../context/AuthContext'
import {useInsertDocument} from '../../hooks/useInsertDocument'


const createPost = () => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")

  const { user } = useAuthValue()

  const navigate = useNavigate()

  const { insertDocument, response } = useInsertDocument("posts")

  const handleSubmit = (e)=>{

      e.preventDefault();
    setFormError("");

    // validate image
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.");
    }

    // create tags array
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // check values
    if (!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos!");
    }

    console.log(tagsArray);

    console.log({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    if(formError){
      return
    }
    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    // redirect to home page

    navigate("/");

    //redirect home page

  }

  return (
    <div className={Styles.create_post}>
        <h2>criar post</h2>
        <p>escreva algum pensamento sobre mr. robot e compartilhe seus delirios</p>
        <form onSubmit={handleSubmit}>

            <label>
              <span>Titulo:</span>
              <input
               type="text"
                name="title"
                 required 
                 placeholder="titulo do seu delirio"
                 onChange={(e)=>{setTitle(e.target.value)}}
                 value={title}
                 />
            </label>

              <label>
              <span>URL da imagem:</span>
              <input
               type="text"
                name="image"
                 required 
                 placeholder="insira uma imagem que demonstre seu delirio"
                 onChange={(e)=>{setImage(e.target.value)}}
                 value={image}
                 />
            </label>

           <label>
              <span>Conteudo:</span>
              <textarea 
               name="body"
               required 
               placeholder="insira o conteudo do post" 
               onChange={(e)=>setBody(e.target.value)}
               value={body}
               >
               </textarea>
            </label>

              <label>
              <span>tags:</span>
              <input
               type="text"
                name="tags"
                 required 
                 placeholder="insira as tags separadas por virgula"
                 onChange={(e)=>{setTags(e.target.value)}}
                 value={tags}
                 />
            </label>

           
            {!response.loading &&<button className="btn" type='submit'>postar</button>}
            {response.loading &&<button className="btn" disabled>aguarde...</button>}

            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
  

        </form>
    </div>
  )
}

export default createPost