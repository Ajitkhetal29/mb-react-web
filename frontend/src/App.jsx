  import { useState } from 'react'
  import reactLogo from './assets/react.svg'
  import viteLogo from '/vite.svg'
  import './App.css'
  import i18n from './i18/i18'

  import {Route, Routes} from 'react-router-dom'
  import Home from './pages/Home'
import Project from './components/Project'
import Navbar from './components/Navbar'

  function App() {
    const [count, setCount] = useState(0)

    return (
      <>
      <Navbar/>

          <div>
            <Routes>
              <Route path='/' element={<Home/>} /> 
              <Route path='/projets' element={<Project/>} /> 
            </Routes>
          </div>

      </>
    )
  }

  export default App
