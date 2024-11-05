import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './Landing.jsx'
import NotFound from './NotFound.jsx'
import LogIn from './LogIn.jsx'
import ContactUs from './ContactUs.jsx'
import UserPage from './pages/UserPage.jsx'
import UserProfesor from './pages/UserProfesor.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/acceder' element={<LogIn />} />
        <Route path='/acceder/tutor/:id' element={<UserPage/>}/>
        <Route path='/acceder/profesor/:id' element={<UserProfesor/>}/>
        <Route path='/contactanos' element={< ContactUs />} />
        <Route path='*' element= {<NotFound />}/>
      </Routes>
    </BrowserRouter>
    </>
  )

}

export default App
