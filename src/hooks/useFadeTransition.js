import { useState, useEffect } from 'react';

const useFadeTransition = (initialData) => {
  const [data, setData] = useState(initialData);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleEntityUpdate = (newData) => {
    setIsFadingOut(true);

    setTimeout(() => {
      setData(newData);
      setIsFadingOut(false);
    }, 500); // Adjust this delay as needed for a smoother transition
  };

  const clearSlider = (className) => {
    const element = document.getElementById('base-slider-container');
    if (element) {
      element.classList.remove('fade-in');
      if (className) {
        element.classList.add(className);
      }
    }
  };

  const toggleEndOfDay = (className) => {
    const element = document.getElementById('base-slider-container');
    const logo = document.querySelector('.logo');
    if (element && logo) {
      element.classList.remove('fade-in');
      element.classList.remove('fade-out');
      logo.classList.remove('fade-in');
      logo.classList.remove('fade-out');
      if (className) {
        element.classList.add(className);
        logo.classList.add(className);
      }
    }
  };


  useEffect(() => {
    const cleanup = () => {
      setIsFadingOut(false); // Ensure the fade-out flag is reset on component unmount
    };

    return cleanup;
  }, []);

  return { data, isFadingOut, handleEntityUpdate, clearSlider, toggleEndOfDay };
};

export default useFadeTransition;