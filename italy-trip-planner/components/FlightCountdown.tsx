import React, { useState, useEffect } from 'react';
import { firstFlightDeparture } from '../data/tripData';
import { Icon } from './Icon';

interface TimeLeft {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
}

const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(firstFlightDeparture) - +new Date();
    let timeLeft: TimeLeft = {};

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        };
    }

    return timeLeft;
};

const FlightCountdown: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const timeParts = [
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Mins', value: timeLeft.minutes },
        { label: 'Secs', value: timeLeft.seconds },
    ];
    
    const hasTimeLeft = Object.keys(timeLeft).length > 0;

    return (
        <div className="bg-brand-accent-light border-l-4 border-brand-accent p-4 rounded-lg my-8 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in">
            <div className="flex items-center text-left w-full sm:w-auto">
                <Icon name="plane" className="w-8 h-8 text-brand-accent mr-4 flex-shrink-0" />
                <div>
                    <h3 className="font-bold text-lg text-brand-primary">Countdown to Departure</h3>
                    <p className="text-sm text-brand-text-muted">Time until the first flight takes off.</p>
                </div>
            </div>
            <div className="flex space-x-3 text-brand-secondary font-mono">
                {hasTimeLeft ? (
                    timeParts.map(part => (
                        <div key={part.label} className="text-center">
                            <span className="text-2xl md:text-3xl font-bold">{String(part.value || 0).padStart(2, '0')}</span>
                            <span className="text-xs block">{part.label}</span>
                        </div>
                    ))
                ) : (
                    <span className="font-semibold text-lg text-brand-primary">Have a great trip!</span>
                )}
            </div>
        </div>
    );
};

export default FlightCountdown;
