import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage.js';
import { CreateAccountPage } from './pages/CreateAccountPage.js';
import { WelcomePage } from './pages/WelcomePage.js';
import { ChangePassword } from './pages/ChangePassword.js';
import { ChangePasswordLogin } from './pages/ChangePasswordLogin.js';
import { SettingsPage } from './pages/SettingsPage.js';
import { DragonStatisticsPage} from './pages/DragonStatisticsPage.js';
import { AddProfilePage } from './pages/AddProfilePage.js';
import { WelcomeAccountPage } from './pages/WelcomeAccountPage.js';
import { KidProfilePage } from "./pages/KidProfilePage.js";
import { ForgetPassword } from "./pages/ForgetPassword.js";
import {jwtDecode} from 'jwt-decode';

function App() {
  // *** Google Login ***

    // Storing user being logged in  || Will want to use something else in the future. ("Global" state, redux)
    const [ user, setUser ] = useState({});

    // Callback for google login
  function handleCallbackResponse(response){
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true; // Hides sign in button when logged in.
    localStorage.setItem('user', user)
  }

  function handleSignOut(event){
    setUser({});
    document.getElementById("signInDiv").hidden = false; // Show sign in button on logged out.
  } 

  // Backend for google login + signin button 
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "686063767700-8qjoop6tdui297ss2pqk63fp2i484ea7.apps.googleusercontent.com", //This is my client id -Marc
      callback: handleCallbackResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large"}
    );
    
    // Pop up side windows for alternative login
    google.accounts.id.prompt();

    // Store userinfo
    
  }, []);
  
   // *** Google Login END***

  return (
    <>
    <div className='App'>
    <div id="signInDiv"></div>

    {Object.keys(user).length != 0 && 
    <button onClick = {(e) => handleSignOut(e)}>Sign Out</button>
    }
        {user &&
    <div>
      <img src ={user.picture}></img>
      <h3>{user.name}</h3>
    </div>
    }

      <main>
      <Routes>
          <Route path='/' element={<WelcomePage />} />
          <Route path='/changepasswordlogin' element={<ChangePasswordLogin/>} />
          <Route path='/changepassword' element={<ChangePassword /> } />
          <Route path='/createaccount' element={<CreateAccountPage />} />
          <Route path='/signin' element={<LoginPage />} />
          <Route path='/settings' element={<SettingsPage />} />
          <Route path='/dragonstatistics' element={<DragonStatisticsPage />} />
          <Route path='/addprofile' element={<AddProfilePage />} />
          <Route path='/welcome' element={<WelcomeAccountPage />} />
          <Route path='/ForgetPassword' element={<ForgetPasswordPage />} />
          <Route path='/KidProfilePage/:id' element={<KidProfilePage />} />
      </Routes>
      </main>
    </div>
    </>

  );
}

export default App;
