import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import { Post } from '../models/post';
import NavBar from './NavBar';
import PostDashboard from '../../features/posts/dashboard/PostDashboard';
import agent from '../api/agent'
import LoadingComponent from './LoadingComponent';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import PostForm from '../../features/posts/form/PostForm';
import PostDetails from '../../features/posts/details/PostDetails';
import TestErrors from '../../features/Errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/Errors/NotFound';
import ServerError from '../../features/Errors/ServerError';


function App() {

  const location = useLocation();

  return (
    <>
      <ToastContainer position='top-right' hideProgressBar />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '8em' }}>
              <Switch>
                <Route exact path='/posts' component={PostDashboard} />
                <Route path='/posts/:id' component={PostDetails} />
                <Route key={location.key} path={['/createPost', '/manage/:id']} component={PostForm} />
                <Route path='/errors' component={TestErrors} />
                <Route path='/server-error' component={ServerError} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
