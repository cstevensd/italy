
import React, { useState, useEffect } from 'react';
import { ScheduleItem } from '../types';
import { Icon } from './Icon';

interface TimeLeft {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
}

const parseScheduleDate = (dateStr: string): Date | null => {
    const year = 2025;
    const cleanDateStr = dateStr.split('-')[0].trim();
    const eventDate = new Date(`${cleanDateStr}, ${year}`);
    if (isNaN(eventDate.getTime())) {
        return null;
    }
    eventDate.setHours(0, 0, 0, 0);
    return eventDate;
};

const Countdown: React.FC<{ schedule: ScheduleItem[] }> = ({ schedule }) => {
    const [nextEvent, setNextEvent] = useState<{ event: ScheduleItem, date: Date } | null>(null);
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({});

    useEffect(() => {
        const now = new Date();
        let firstFutureEvent = null;

        for (const item of schedule) {
            const eventDate = parseScheduleDate(item.date);
            if (eventDate && eventDate > now) {
                firstFutureEvent = { event: item, date: eventDate };
                break;
            }
        }
        setNextEvent(firstFutureEvent);
    }, [schedule]);

    useEffect(() => {
        if (!nextEvent) {
            setTimeLeft({});
            return;
        }

        const calculate = () => {
            const difference = +nextEvent.date - +new Date();
            let newTimeLeft: TimeLeft = {};

            if (difference > 0) {
                newTimeLeft = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }
            return newTimeLeft;
        };

        setTimeLeft(calculate());
        const timer = setInterval(() => {
            setTimeLeft(calculate());
        }, 1000);

        return () => clearInterval(timer);
    }, [nextEvent]);

    if (!nextEvent) {
        return (
            <div className="bg-brand-success-bg border-l-4 border-brand-success p-4 rounded-lg my-8 flex items-center justify-center gap-4 animate-fade-in">
                <Icon name="check" className="w-8 h-8 text-brand-success mr-4 flex-shrink-0" />
                <div>
                    <h3 className="font-bold text-lg text-brand-primary">Trip in Progress!</h3>
                    <p className="text-sm text-brand-text-muted">Enjoy your adventure in Italy!</p>
                </div>
            </div>
        );
    }

    const hasTimeLeft = Object.keys(timeLeft).length > 0;
    const timeParts = [
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Mins', value: timeLeft.minutes },
        { label: 'Secs', value: timeLeft.seconds },
    ];

    return (
        <div className="bg-brand-accent-light border-l-4 border-brand-accent p-4 rounded-lg my-8 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in">
            <div className="flex items-center text-left w-full sm:w-auto">
                <Icon name="calendar" className="w-8 h-8 text-brand-accent mr-4 flex-shrink-0" />
                <div>
                    <h3 className="font-bold text-lg text-brand-primary">Next Up: {nextEvent.event.activity}</h3>
                    <p className="text-sm text-brand-text-muted">Countdown to the next event on {nextEvent.event.date}.</p>
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
                    <span className="font-semibold text-lg text-brand-primary">It's happening!</span>
                )}
            </div>
        </div>
    );
};

export default Countdown;
