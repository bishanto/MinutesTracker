import './App.css';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { CreateAccountPage } from './pages/CreateAccountPage';
import { WelcomePage } from './pages/WelcomePage';
import { ChangePassword } from './pages/ChangePassword';
import { ChangePasswordLogin } from './pages/ChangePasswordLogin';

function App() {
  return (
    <>
    <div className='App'>
      <main>
      <Routes>
          <Route path='/' element={<WelcomePage />} />
          <Route path='/changepasswordlogin' element={<ChangePasswordLogin/>} />
          <Route path='/changepassword' element={<ChangePassword /> } />
          <Route path='/createaccount' element={<CreateAccountPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signin' element={<LoginPage />} />
      </Routes>
      </main>
    </div>
    </>

  );
}

export default App;
