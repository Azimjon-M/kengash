// src/CountdownTimer.js

import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetTime }) => {
    const [remainingTime, setRemainingTime] = useState(calculateTimeRemaining());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRemainingTime(calculateTimeRemaining());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    function calculateTimeRemaining() {
        const now = new Date().getTime();
        const target = new Date(targetTime).getTime();
        const difference = target - now;

        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

        return { hours, minutes };
    }

    const isTimerExpired = remainingTime.hours === 0 && remainingTime.minutes === 0;

    useEffect(() => {
        if (isTimerExpired) {
            console.log('Vaqt tugadi!');
        }
    }, [isTimerExpired]);

    return (
        <div>
            <p>{`${String(remainingTime.hours).padStart(2, '0')}:${String(remainingTime.minutes).padStart(2, '0')}`}</p>
        </div>
    );
};

export default CountdownTimer;
