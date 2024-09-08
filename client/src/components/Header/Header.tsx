import './Header.css';
import ThemeMode from '../ThemeMode/ThemeMode';
import SearchInput from '../SearchInput/SearchInput';
import HamburgerNavBar from '../HamburgerNavBar/HamburgerNavBar';
import Menu from '../Menu/Menu';
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { IUserAuthContextType, IUserDetailsType } from '../../interfaces/IUserDetails'
import { useNavigate } from 'react-router-dom';


export default function Header() {
  const auth = useContext(AuthContext) as IUserAuthContextType;
  const navigate = useNavigate();

  const isSignedIn = auth?.isSignedIn || false;
  const isAdmin = auth?.isAdmin || false;
  const userDetails = auth?.userDetails || {
    image: {
      url: '',
      alt: '',
    },
  } as IUserDetailsType;
  const userImage = userDetails.image;

  return (
    <nav className='Header'>
      <div className='leftNav'>
        <Link to='/'>
          <img className='logo' alt='logo' src="/assets/img/logo.png" />
        </Link>

        <HamburgerNavBar />

        <ul className='desktopNavBar'>
          <Menu />
        </ul>

        <img
          className='cartImg'
          alt='cart image'
          src="/assets/img/blueCart.png"
          style={{ display: isSignedIn ? "none" : "block" }}
          onClick={() => navigate('/mycards')}
        />
        <img
          className='adminImg'
          alt='admin image'
          src="/assets/img/admint.png"
          style={{ display: isAdmin ? "block" : "none" }}
          onClick={() => navigate('/inventorydashboard')}
        />



      </div>

      <div className='rightNav'>
        <SearchInput />
        <ThemeMode />

        <img
          className='loginImg'
          alt='login'
          src="/assets/img/log-in.png"
          style={{ display: isSignedIn ? "none" : "block" }}
          onClick={() => navigate('/login')}
        />

        <img
          className='logoutImg'
          alt=''
          src="/assets/img/log-out.png"
          style={{ display: isSignedIn ? "block" : "none" }}
          onClick={() => {
            auth?.logOut();
            navigate('/home');
          }}
        />

        {isSignedIn ? (
          <Link to="/edituser">
            <img
              className="userImg"
              alt={userImage.alt || "user img"}
              src={userImage.url || "/assets/img/user.png"}
            />
          </Link>
        ) : (
          <img
            className="userImg"
            alt="user img"
            src="/assets/img/user.png"
          />
        )}

      </div>
    </nav>
  );
}

