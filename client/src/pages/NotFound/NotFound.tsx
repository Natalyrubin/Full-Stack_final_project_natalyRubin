import './NotFound.css'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='NotFound_Page'>
      <h1>404</h1>
      <p>There's NOTHING here...</p>


      <button>
        <Link to="/"> Back home</Link>
      </button>
    </div>
  )
}
