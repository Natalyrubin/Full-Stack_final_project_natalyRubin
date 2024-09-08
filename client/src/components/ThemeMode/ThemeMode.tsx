import { useEffect, useState } from 'react';
import './ThemeMode.css';





export default function ThemeMode() {

  const [isLightMode, setIsLightMode] = useState(true);


  const toggleTheme = () => {
    if (isLightMode) {
      localStorage.setItem('themeMode', 'dark');
      setIsLightMode(false);
    } else {
      localStorage.setItem('themeMode', 'light');
      setIsLightMode(true);
    }
  };



  useEffect(() => {
    const storedTheme = localStorage.getItem('themeMode');
    const elmDocument = document.documentElement;

    if (storedTheme === 'dark') {
      elmDocument.classList.add('darkMode');
      elmDocument.classList.remove('lightMode');
      setIsLightMode(false);
    } else {
      elmDocument.classList.add('lightMode');
      elmDocument.classList.remove('darkMode');
      setIsLightMode(true);
    }
  }, [isLightMode]);




  return (
    <div className='ThemeMode'>
      <img src={`/assets/img/${isLightMode ? 'dark-mode' : 'light'}.png`} alt="ThemeMode" onClick={toggleTheme} />
    </div>
  );
};








