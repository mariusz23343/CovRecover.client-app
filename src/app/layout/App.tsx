import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Post } from '../models/post';
import NavBar from './NavBar';
import PostDashboard from '../../features/posts/dashboard/PostDashboard';


function App() {

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios.get<Post[]>('http://localhost:5000/api/Posts').then(response => {
      console.log(response);
      setPosts(response.data);
    })
  }, []);

  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop: '8em'}}>
        <PostDashboard posts={posts} />
      </Container>
      
        
    </Fragment>
  );
}

export default App;
