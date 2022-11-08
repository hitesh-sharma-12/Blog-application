import { React, useState, useEffect } from 'react'
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import {Card, CardContent, Typography, CardMedia } from '@mui/material'; 
import del from './del.png';
const Home = (isAuth) => {

  const [postLists, setPostLists] = useState([]);
  const postCollectionRef= collection(db, 'blogdb');

  const deletePost= async (id) => {
    console.log("Element delete working");
    const postDoc= doc(db, 'blogdb', id);
    await deleteDoc(postDoc);
  }

  useEffect(() => {
    const getPosts = async () => {
      try{
      const data= await getDocs(postCollectionRef);
    setPostLists(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
      }catch(e){
        window.location.pathname= '/login';
      }
  };
  getPosts();
});

const divStyle= {
  width: '500px',
}

const imgStyle= {
  width: '30px',
}

return (
  <div className= 'homepage'>
    {
      postLists.map((post) => {
        return <div style={ divStyle }>
        <Card className= 'muicard'>
            <CardContent>
              <CardMedia component= 'img' height= '140' image= { post.image } alt= 'image'></CardMedia>
              <Typography gutterBottom variant="h5" component='div'>
                {post.title}
              </Typography>
              <Typography variant= 'body1' color= 'black'>
                {post.postText}
              </Typography>
              <p></p>
              <Typography gutterBottom variant="h8" component='div' color= 'text.secondary'>
                @{post.author.name}
              </Typography>
            </CardContent>
            {post.author.id === auth.currentUser.uid && <button onClick= { () =>deletePost(post.id) }><img src= { del } style= { imgStyle } alt= 'del'/></button>}
        </Card>
      </div>
      })
  }
  </div>
);
}

export default Home