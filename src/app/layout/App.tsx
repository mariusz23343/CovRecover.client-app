import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Post } from '../models/post';
import NavBar from './NavBar';
import PostDashboard from '../../features/posts/dashboard/PostDashboard';
import {v4 as uuid} from 'uuid';


function App() {

  const [posts, setPosts] = useState<Post[]>([]);
  const [selctedPost, setSelectedPost] = useState<Post | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Post[]>('http://localhost:5000/api/Posts').then(response => {
      console.log(response);
      setPosts(response.data);
    })
  }, []);

  function handleSelectPost(id: string){
    setSelectedPost(posts.find(x => x.id === id))
  }

  function handleCancelSelectedPost(){
    setSelectedPost(undefined);
  }

  function handleFormOpen(id?: string){
    id ? handleSelectPost(id) : handleCancelSelectedPost();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEditPost(post: Post){
    post.id ? setPosts([...posts.filter(x => x.id !== post.id), post])
    : setPosts([...posts, {...post, id: uuid()}]); // jak mamy id to strzelamy podmianke(czyli dajemy wszystkie te ktore nie maja id edytowanego (usuwamy go) i dodajemy edytowany), jak nie to dodajemy do tablicy nowa

    setEditMode(false);

    setSelectedPost(post);
  }

  function handleDeletePost(id: string){
    setPosts([...posts.filter(x => x.id !== id)])
  }
  function handlePublishPost(post: Post){
    setPosts([...posts.filter(x => x.id !== post.id), post])
  }

  return (
    <Fragment>
      <NavBar openForm={handleFormOpen} />
      <Container style={{marginTop: '8em'}}>
        <PostDashboard 
          posts={posts} 
          selectedPost={selctedPost}
          selectPost={handleSelectPost}
          cancelSelectedPost={handleCancelSelectedPost}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditPost}
          deletePost={handleDeletePost}
          changePublishStatus={handlePublishPost}
        />
      </Container>
      
        
    </Fragment>
  );
}

export default App;
