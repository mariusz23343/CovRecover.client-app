import React, { Fragment, useEffect, useState } from 'react';
import { Container, Header, List } from 'semantic-ui-react';
import { Post } from '../models/post';
import NavBar from './NavBar';
import PostDashboard from '../../features/posts/dashboard/PostDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent'
import LoadingComponent from './LoadingComponent';


function App() {

  const [posts, setPosts] = useState<Post[]>([]);
  const [selctedPost, setSelectedPost] = useState<Post | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Posts.list().then(response => {
      console.log(response);
      setPosts(response);
      setLoading(false);
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

    setSubmitting(true);

    if(post.id){
      agent.Posts.update(post).then(() => {
        setPosts([...posts.filter(x => x.id !== post.id), post])
        setSelectedPost(post);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      post.id = uuid();
      agent.Posts.create(post).then(() => {
        setPosts([...posts, post]);
        setSelectedPost(post);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }

  function handleDeletePost(id: string){
    setSubmitting(true);
    agent.Posts.delete(id).then(() => {
      setPosts([...posts.filter(x => x.id !== id)]);
      setSubmitting(false);
    })
  }
  function handlePublishPost(post: Post){
    setPosts([...posts.filter(x => x.id !== post.id), post])
  }

  if(loading) return <LoadingComponent content='Ładowanie' />

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
          submitting={submitting}
        />
      </Container>
      
        
    </Fragment>
  );
}

export default App;
