import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Steps from "./pages/Steps";
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Rooms from './pages/Rooms';
import SingleRoom from './pages/SingleRoom';



const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Steps/>}/>
          <Route path='/login' element={<Login/>} />
          <Route path='/forgotpassword' element={<ForgotPassword/>} />
          <Route path='/resetpassword/:token' element={<ResetPassword/>} />
          <Route path='/rooms' element={<Rooms/>} />
          <Route path='/rooms/:roomId' element={<SingleRoom/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
