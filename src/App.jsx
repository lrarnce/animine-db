import './css/App.css'
import AnimeCard from './components/AnimeCard'
import Navbar from './components/Navbar'
import Favorites from './pages/Favorites'
import Home from './pages/Home'
import { Routes,Route } from 'react-router-dom'
import { AnimeProvider } from './contexts/AnimeContext'
import AnimeDetails from './pages/AnimeDetails'

function App() {
  
  return (
    <AnimeProvider>
       <Navbar/>
        <div className="main-content">
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/favorites' element={<Favorites/>}/>
            <Route path='/anime/:id' element={<AnimeDetails/>}/>
          </Routes>  
        </div> 
    </AnimeProvider>
   
    
  )
}

export default App
