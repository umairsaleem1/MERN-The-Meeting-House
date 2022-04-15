import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import Steps from "./pages/Steps";
import Login from './pages/Login';
import Rooms from './pages/Rooms';



const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Steps/>}/>
          <Route path='/login' element={<Login/>} />
          <Route path='/rooms' element={<Rooms/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
