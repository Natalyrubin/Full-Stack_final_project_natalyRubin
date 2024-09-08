import './Home.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { useContext } from 'react'

export default function Home() {

  const auth = useContext(AuthContext)

  return (
    <div className='HomePage'>
      <h1>
        <span style={{ display: auth?.isSignedIn ? "block" : "none" }}>Hi {auth?.userDetails?.name.first},</span>
        Welcome To Convex
      </h1>

      <p>Your Gateway to the Ultimate Surfing Experience!
        <br />
        At our Surfboard Shop, we take pride in creating surfboards that elevate your ride. Our dedicated team is committed to crafting high-quality boards with a quick turnaround, ensuring you're ready to hit the waves in no time.
        <br /><br />
        Explore a diverse range of modern and innovative designs, each customizable to match your unique style and surfing needs. Whether you're after a stable board for beginners or a high-performance model for seasoned surfers, we have the perfect fit for you.
        <br /><br />
        Our surf experts are here to help bring your surfing dreams to life. Contact us today to start your journey toward the perfect surfboard that captures the essence of your surfing style.
        <br /><br />
        Ready to see our collection? Click here to visit our Surfboard Gallery and discover the craftsmanship that sets us apart.
        <br /><br />
        Elevate your surfing experience with us - Where Every Board Tells a Story!
      </p>





      <Link to="/Cards" className="button">
        Our Boards
      </Link>


    </div>
  )
}
