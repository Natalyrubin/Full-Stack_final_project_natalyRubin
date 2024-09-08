import './About.css'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className='About'>

      <h1>About Us</h1>

      <p>
        Welcome to our Surfboard Shop! We specialize in crafting high-quality surfboards tailored to riders of all levels, ensuring an exceptional experience on every wave.
        <br /><br />
        Our boards are designed with precision, blending modern technology with traditional craftsmanship to deliver surfboards that are not only functional but also a work of art. Whether you're a beginner looking for stability or a seasoned pro seeking performance, we have the perfect board for you.
        <br /><br />
        Our team of experienced shapers and surfers is dedicated to helping you find or create the surfboard that fits your style and needs. From custom designs to a wide selection of ready-to-ride boards, we are here to elevate your surfing experience.
        <br /><br />
        Contact us to get started on your journey with the perfect surfboard!
        To see our collection and latest designs, click here to visit our Surfboard Gallery.
      </p>


      <button>
        <Link to="/Cards">Our Boards</Link>
      </button>

    </div>
  )
}
