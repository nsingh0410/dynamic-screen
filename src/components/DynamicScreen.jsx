import React, { useEffect } from 'react';
import { socket } from '../service/socket';
import TimerComponent from './Timer.jsx';
import useFadeTransition from '../hooks/useFadeTransition.js';
const DynamicSlider = ({
  socketEventName = 'another', // Default socket event name
  clearSliderEventSuffix = '-clearSlider', // Default clear slider event suffix
  containerId = 'base-slider-container', // Default container id
  fadeTransitionClass = 'base-slider-container', // Default transition class
}) => {
  const { data: raceData, isFadingOut, handleEntityUpdate, clearSlider } = useFadeTransition(null);
  const currentURL = window.location.href;

    useEffect(() => {
    // Listen for dynamic socket event for entity updates
      socket.on(socketEventName, handleEntityUpdate);
      
    // Listen for dynamic clear slider event based on URL
    socket.on(`${currentURL}${clearSliderEventSuffix}`, (data) => {
      clearSlider(data.class);
    });

    // Clean up on component unmount
    return () => {
      socket.off(socketEventName, handleEntityUpdate);
      socket.off(`${currentURL}${clearSliderEventSuffix}`);
    };
  }, [socketEventName, clearSliderEventSuffix, handleEntityUpdate, clearSlider]);

  // Check if raceData and raceData.start are defined before passing to the TimerComponent
  const formattedDate = raceData && raceData.start;
  return (
    <>
      {raceData && (
        <div id={containerId} className={`${fadeTransitionClass} ${isFadingOut ? 'fade-out' : 'fade-in'}`}>
          <div className='base-slider'>
            <div className='slider-data trackname'>{raceData.trackname}</div>
            <div className='race-info'>
              <div className='slider-data racenumber'>{raceData.racenumber ? `RACE ${raceData.racenumber}` : 'NO RACE DATA'}</div>
              <div className='slider-data distance'>{raceData.distance ? `m ${raceData.distance}` : ''}</div>
            </div>
            <div className='slider-data title'>{raceData.title}</div>
            <TimerComponent unixEpoch={formattedDate} />
          </div>
        </div>
      )}
    </>
  );
};

export default DynamicSlider;