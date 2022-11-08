import { React, useState, useEffect } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

const CreatePost = ({ isAuth }) => {

  const [title, setTitle] = useState('');
  const [postText, setPostText] = useState('');
  const [image, setImage] = useState('');
  let navigate= useNavigate();
  const postCollectionRef= collection(db, 'blogdb');
  
  const createPost= async () => {
    await addDoc(postCollectionRef, {
      title, 
      postText,
      author: {name: auth.currentUser.displayName, id: auth.currentUser.uid},
      image: image
    });
    navigate('/');
  }

  useEffect(() => {
    if(!isAuth)
      navigate('/login');
  }, [])

  return (
    <div className= 'CreatePostPage'>
      <div className= 'cpContainer'>
        <h1>Create A Post</h1>
        <div className= 'inputGp'>
          <label>Title:</label>
          <input placeholder= 'Title...' onChange= { (e) => {
            setTitle(e.target.value);
          }}/>
        </div>
        <div className= 'inputGp'>
          <label>Post:</label>
          <textarea placeholder= 'Post...' onChange= { (e) => {
            setPostText(e.target.value);
          }}/>
        </div>
        <div className= 'inputGp'>
          <label>Image Source:</label>
          <input placeholder= 'Source...' onChange= { (e) => {
            setImage(e.target.value);
          }}/>
        </div>
        <button onClick= {createPost }>Submit Post</button>
      </div>
    </div>
  )
}

export default CreatePost