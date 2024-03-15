import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import background from '../../assets/background.png';

const useBackgroundImage = () => {
  const location = useLocation();
  useEffect(() => {
    const divElement = document.getElementById('root');
    if (divElement && (window.location.pathname.includes('home') || window.location.pathname === '/')) {
      divElement.style.backgroundImage = `url(${background})`;
      divElement.style.backgroundPosition = `center`;
    } else {
      divElement!.style.backgroundImage = 'none';
    }
  }, [location]);
};

export default useBackgroundImage;
