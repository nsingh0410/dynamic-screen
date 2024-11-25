import React, { useEffect, useState } from 'react';
import { convertDateFormatToTimestamp } from '../service/utils';

const Timer = ({ unixEpoch }) => {
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!unixEpoch) {
      return; // Early return if unixEpoch is not provided
    }

    const formattedDate = new Date(unixEpoch).toISOString();
    const unixEpochTimestamp = convertDateFormatToTimestamp(formattedDate);

    const targetTime = new Date(unixEpochTimestamp * 1000);

    const updateCountdown = () => {
      const currentTime = new Date();
      const timeDifference = targetTime - currentTime;

      // Calculate total minutes
      const totalMinutes = Math.floor(timeDifference / (1000 * 60));

      // Calculate hours, remaining minutes, and seconds
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      if (timeDifference <= 0) {
        clearInterval(timerInterval);
        // Additional logic if needed when timer reaches zero
      }

      setCountdown({ hours, minutes, seconds });
    };

    // Update the countdown every second
    const timerInterval = setInterval(updateCountdown, 1000);

    // Initial update
    updateCountdown();

    // Cleanup interval on component unmount
    return () => {
      clearInterval(timerInterval);
    };
  }, [unixEpoch]);

  if (!unixEpoch) {
    return null;
  }

  // Function to format seconds to always display 2 digits
  const formatSeconds = (seconds) => {
    return seconds < 10 ? `0${seconds}` : seconds;
  };

  const remainingTime = countdown.hours * 60 + countdown.minutes;
  const displayTime = remainingTime > 4 ? `${countdown.minutes} mins` : `${countdown.hours * 60 + countdown.minutes}:${formatSeconds(countdown.seconds)}`;

  return (
    <div className='slider-data timer'>
      {`${countdown.hours * 60 + countdown.minutes}:${formatSeconds(countdown.seconds)}`}
    </div>
  );
};

export default Timer;