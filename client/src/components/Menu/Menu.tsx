import "./Menu.css"
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'


export default function Menu() {

  const auth = useContext(AuthContext)

  return (
    <div className="Menu">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/cards">SurfBoards</Link>
      </li>
      <li style={{ display: auth?.isSignedIn ? "block" : "none" }}>
        <Link to="/myCards">My Cart</Link>
      </li>
    </div>
  )
}

