import { useEffect, useState } from 'react';

export const useContentLoader = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoaded(true);
    };

    const images = document.querySelectorAll('img');
    const totalImages = images.length;
    let loadedImages = 0;

    images.forEach((image) => {
      if (image.complete) {
        loadedImages++;
      } else {
        image.addEventListener('load', () => {
          loadedImages++;
          if (loadedImages === totalImages) {
            handleLoad();
          }
        });
      }
    });

    if (loadedImages === totalImages) {
      handleLoad();
    }

    return () => {
      images.forEach((image) => {
        image.removeEventListener('load', handleLoad);
      });
    };
  }, []);

  return isLoaded;
};

export default useContentLoader;
