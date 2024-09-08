import { useState } from 'react';
import './HamburgerNavBar.css';
import Menu from '../Menu/Menu';

export default function HamburgerNavBar() {
  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  return (
    <div className="HamburgerNavBar">
      <button onClick={toggleMenu} type="button" className="hamburger">
        &#9776;
      </button>

      {isMenuVisible && (

        <ul className="mobileNavBar">
          <Menu />
        </ul>
      )}
    </div>
  );
}
