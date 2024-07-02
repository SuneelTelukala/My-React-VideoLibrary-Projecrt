import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useState,useEffect } from 'react';
import axios from 'axios';


import { useCookies } from 'react-cookie';

import { Videomain } from './Components/video-main';
import { UserRegister } from './Components/user-register';
import { UserSignin } from './Components/user-login';
import { UserDashboard } from './Components/user-dashboard';
import { AdminLogin } from './Components/admin-login';
import { AdminDashBoard } from './Components/admin-dashboard';
import { AddVideo } from './Components/add.video';
import { EditVideo } from './Components/edit-video';
import { DeleteVideo } from './Components/delete-video';










function SignoutComponent(){
   const [cookies, setCookie, removeCookie] = useCookies('userName');
   let navigate = useNavigate();
   function handleSignout(){
      removeCookie('userName');
      navigate('/userlogin');
     }
   return(
      <button onClick={handleSignout} className='btn btn-light me-2'>Signout</button>
   )
}

function App() {

  const [cookies, setCookie, removeCookie] = useCookies('userName');
  

  


  return (
    <div className='container-fluid bg-dark text-light' style={{height:'100vh'}}>
      <BrowserRouter>
         <header className='p-2 d-flex justify-content-between'>
            <div>
               <span className='h3'> <Link  style={{color:'white', textDecoration:'none'}} to='/'>Video Library</Link> </span>
            </div>
            <div>
               {
                  (cookies['userName']===undefined) ? <Link className='btn btn-light me-2' to='/userlogin'>User Signin</Link> : <SignoutComponent/>
               }
               <Link to="/adminlogin" className='btn btn-light'> <span className='bi bi-person-fill'></span> Admin Dashboard </Link>
            </div>
         </header>
         <section>
            <Routes>
                
                  <Route  path='/' element={<Videomain/>}  />
                  <Route path='/userregister' element={<UserRegister/>} />  
                  <Route  path='/userlogin'  element={<UserSignin/>} />
                  <Route  path='/userdashboard' element={<UserDashboard/>} />
                  <Route path='/adminlogin' element={<AdminLogin/>} />
                  <Route path='/admindashboard' element={<AdminDashBoard/>} />
                  <Route path='/addvideo' element={<AddVideo/>} />
                  <Route path='/editvideo/:id'  element={<EditVideo/>} />
                  <Route path='/deleteVideo/:id'  element={<DeleteVideo/>} />
                      
            </Routes>
         </section>
      </BrowserRouter>
    </div>
  );
}

export default App;