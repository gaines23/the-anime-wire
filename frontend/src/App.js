import React, { Suspense, useState, useEffect, Fragment } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import 'date-fns-tz';

import Layout from './Components/Layout/Layout';
import LoadingSpinner from './Components/UI/LoadingSpinner';
import './App.css';

const Home = React.lazy(() => import ('./Pages/Home'));
const Login = React.lazy(() => import ('./Pages/Login'));

const NotFound = React.lazy(() => import ('./Pages/NotFound'));


function App() {

  // const [isAuth, setIsAuth] = useState(false);
  // useEffect(() => {     
  //   if (localStorage.getItem('token') !== null) {
  //     setIsAuth(true); 
  //   }
  // }, [isAuth]);

  return (
    <Layout>
      <Suspense 
        fallback={
          <LoadingSpinner />
        }
      >
        <Routes>
          {/* {!isAuth && (
            <Fragment>
              <Route path='/login' element={<Login />} />
              <Route path='/' element={<Login />} />
            </Fragment>          
          )}
          
          {isAuth && (
            <Fragment>
              <Route path='/' element={<Navigate to='/home' />} />
              <Route path='/home' element={<Home />} />

              <Route path='*' element={<NotFound />} />
            </Fragment>
          )} */}

          <Fragment>
              <Route path='/' element={<Navigate to='/home' />} />
              <Route path='/home' element={<Home />} />

              <Route path='*' element={<NotFound />} />
            </Fragment>
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
