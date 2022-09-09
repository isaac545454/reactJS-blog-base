
import React from 'react'
import Styles from './editPost.module.css'
import {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {useAuthValue} from '../../context/AuthContext'
import {useUpdateDocument} from '../../hooks/useUpdateDocuments'
import { useFetchDocument } from '../../hooks/useFetchDocument'


const editPost = () => {
   const {id} = useParams()
   const { document: post } = useFetchDocument("posts", id)

  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")

  useEffect(()=>{
    if(post){
        setTitle(post.title)
        setBody(post.body)
        setImage(post.image)
        const textTags = post.tagsArray.join(", ")
        setTags(textTags)
    }
  }, [post])

  const { user } = useAuthValue()

  const navigate = useNavigate()

  const { updateDocument, response } = useUpdateDocument("posts")

  const handleSubmit = (e)=>{
     console.log("ccc")
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

    if(formError) return


    const data = {
      title,
      image,
      body,
      tagsArray,
    }

    updateDocument(id, data)

    // redirect to home page
    navigate("/deshboard");

    //redirect home page

  }

  return (
    <div className={Styles.edit_post}>
        {!post && <p>carregando</p>}
        {post && (
        <>
        <h2>editar post</h2>
        {post && <p>{post.title}</p>}
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
            <p className={Styles.preview_title}>preview da imagem atual</p>
            <img src={post.image} alt={post.title} className={Styles.image_preview} />

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

           
            {!response.loading &&<button className="btn" type='submit'>editar</button>}
            {response.loading &&<button className="btn" disabled>aguarde...</button>}

            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
  

        </form>
        </>)}
    </div>
  )
}

export default editPost