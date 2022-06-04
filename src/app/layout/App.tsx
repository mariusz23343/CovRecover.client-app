import React, { Fragment, useEffect } from 'react';
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
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import ModalContainter from '../common/form/modals/ModalContainter';


function App() {

  const location = useLocation();
  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if(commonStore.token){
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if(!commonStore.appLoaded) return <LoadingComponent content='Ładowanie aplikacji...' />

  return (
    <>
      <ToastContainer position='top-right' hideProgressBar />
      <ModalContainter />
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
                <Route path='/login' component={LoginForm} />
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
