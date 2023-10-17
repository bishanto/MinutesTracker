import './App.css';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { CreateAccountPage } from './pages/CreateAccountPage';
import { WelcomePage } from './pages/WelcomePage';

function App() {
  return (
    <>
    <div className='App'>
      <main>
      <Routes>
          <Route path='/' element={<WelcomePage />} />
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
