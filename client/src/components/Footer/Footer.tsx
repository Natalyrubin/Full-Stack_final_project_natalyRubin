import './Footer.css'







export default function Footer() {
  return (
    <div className='Footer'>


      <div className='aboutFooter'>
        <h6>About Us</h6>
        <p>Elevate your style presence with Convex <br /> Where Every Board Tells a Story!</p>
      </div>


      <hr />

      <div className="socialContact">
        <h6>Social Us</h6>
        <div className="footerImg">
          <a href="mailto: natirubrub@gmail.com" target="_blank"><img src="/assets/img/gmail.png" alt="email_icon" className="imgF" /></a>
          <a href="https://www.instagram.com/nataly_rubin_/" target="_blank"><img src="/assets/img/insta_icon.png"
            alt="instagram_icon" className="imgF" /></a>
          <a href="https://www.linkedin.com/in/nataly-rubin/" target="_blank"><img src="/assets/img/linkedin.png" alt="linkedin_icon" className="imgF" /></a>
          <a href="https://www.facebook.com/RubinSuccess" target="_blank"><img src="/assets/img/fb_icon.png"
            alt="facebook_icon" className="imgF" /></a>
        </div>
      </div>

      <hr />

      <div className='newsletter'>
        <h6>Get a Daily Tip</h6>
        <label htmlFor="Newsletter" className="form-label">Subscribe To Our Newsletter</label>
        <div className='inputSubscribe'>
          <input id='Newsletter' type="text" className="form-control form-control-sm me-2" placeholder="Enter Your Email" />
          <button className="btn btn-sm btn-primary">Subscribe</button>
        </div>
      </div>



    </div>
  )
}





