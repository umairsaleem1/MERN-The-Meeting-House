import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Steps from "./pages/Steps";
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Rooms from './pages/Rooms';
import SingleRoom from './pages/SingleRoom';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';



const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Rooms/>} />
          <Route path='/register' element={<Steps/>}/>
          <Route path='/login' element={<Login/>} />
          <Route path='/forgotpassword' element={<ForgotPassword/>} />
          <Route path='/resetpassword/:token' element={<ResetPassword/>} />
          <Route path='/:roomId' element={<SingleRoom/>}/>
          <Route path='/me' element={<Profile/>} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
