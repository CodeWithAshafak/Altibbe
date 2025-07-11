
import { BrowserRouter ,Route,Routes } from 'react-router-dom'
// import Dashlayout from './Dashlayout'
import Dashlayout from './Dashlayout'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './admindashboard/Home'
import Register from './admindashboard/pages/Register'
import Update from './admindashboard/pages/Update'
import Studentdata from './admindashboard/pages/Studentdata'
function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      <Route path='/dashboard' element={<Dashlayout/>}>
          <Route  index element={<Home/>} />
          <Route path="home" element={<Home/>} /> 
          <Route path="register" element={<Register/>} />
          <Route path="update" element={<Update/>} />
          <Route path="studentdata" element={<Studentdata/>} />
      </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
