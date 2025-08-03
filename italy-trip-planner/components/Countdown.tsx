
import React, { useState, useEffect } from 'react';
import { tripStartDate } from '../data/tripData';

const Countdown: React.FC = () => {
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const calculateDaysLeft = () => {
      const targetDate = new Date(tripStartDate);
      const now = new Date();
      // Reset time to midnight to count full days
      now.setHours(0, 0, 0, 0);
      targetDate.setHours(0, 0, 0, 0);

      const diffTime = targetDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysLeft(diffDays > 0 ? diffDays : 0);
    };

    calculateDaysLeft();
    // No need for an interval as the day won't change frequently for the user
  }, []);

  return (
    <div className="text-center">
      <div className="text-6xl font-extrabold text-white">{daysLeft}</div>
      <div className="text-lg text-white font-semibold opacity-90">Days Until Italy!</div>
    </div>
  );
};

export default Countdown;