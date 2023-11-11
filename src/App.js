import './App.css';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { CreateAccountPage } from './pages/CreateAccountPage';
import { WelcomePage } from './pages/WelcomePage';
import { ChangePassword } from './pages/ChangePassword';
import { ChangePasswordLogin } from './pages/ChangePasswordLogin';
import { SettingsPage } from './pages/SettingsPage';
import { DragonStatisticsPage} from './pages/DragonStatisticsPage';
import { AddProfilePage } from './pages/AddProfilePage';
import { WelcomeAccountPage } from './pages/WelcomeAccountPage';
import { KidProfilePage } from "./pages/KidProfilePage";



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
          <Route path='/settings' element={<SettingsPage />} />
          <Route path='/dragonstatistics' element={<DragonStatisticsPage />} />
          <Route path='/addprofile' element={<AddProfilePage />} />
          <Route path='/welcome' element={<WelcomeAccountPage />} />
          <Route path='/KidProfilePage' element={<KidProfilePage />} />
      </Routes>
      </main>
    </div>
    </>

  );
}

export default App;
