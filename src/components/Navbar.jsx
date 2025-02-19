import { Link } from "react-router-dom"
import '../css/Navbar.css'

function Navbar(){
    return(
        <div className="navbar">
           <div className="navbar-brand">
           <Link to="/">Animine DB</Link>
           </div>
           <div className="navbar-links">
           <Link to="/">Home</Link>
           <Link to="/favorites">Favorites</Link>
           </div>
        </div>
    )
}


export default Navbar