import { useState, useEffect } from "react";

function getTimeZone(timeZone) {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // 24-hour format
  };
  return new Intl.DateTimeFormat('en-US', { ...options, timeZone }).format(new Date());
}

const timeZones = {
  kathmandu: 'Asia/Kathmandu',
  milan: 'Europe/Rome',
  belfast: 'Europe/Dublin',
  newYork: 'America/New_York',
};

function TimeDisplay() {
  const [times, setTimes] = useState({
    kathmandu: '',
    milan: '',
    belfast: '',
    newYork: '',
  });

  // Function to update the times
  function updateTime() {
    const kathmanduTime = getTimeZone(timeZones.kathmandu);
    const milanTime = getTimeZone(timeZones.milan);
    const belfastTime = getTimeZone(timeZones.belfast);
    const newYorkTime = getTimeZone(timeZones.newYork);

    setTimes({
      kathmandu: kathmanduTime,
      milan: milanTime,
      belfast: belfastTime,
      newYork: newYorkTime,
    });
  }

  // Update the times every second
  useEffect(() => {
    updateTime(); // Initial time fetch
    const intervalId = setInterval(updateTime, 1000); // Set the interval

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);

  return times
}

export default TimeDisplay;
