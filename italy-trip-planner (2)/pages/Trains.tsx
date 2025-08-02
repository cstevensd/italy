
import React, { useState } from 'react';
import { Icon } from '../components/Icon';
import { fetchTrainTimes } from '../services/trainService';
import { TrainTime } from '../types';

const locations = ['Rome', 'Florence', 'Pisa'];

const getStationName = (city: string): string => {
    const stationMap: { [key: string]: string } = {
        'Rome': 'Roma (Tutte le stazioni)',
        'Florence': 'Firenze (Tutte le stazioni)',
        'Pisa': 'Pisa (Tutte le stazioni)',
    };
    return stationMap[city] || city;
}

const TrainCard: React.FC<{ train: TrainTime; departure: string; destination: string; searchDate: string; }> = ({ train, departure, destination, searchDate }) => {
    const getTrainTypeColor = (type: TrainTime['trainType']) => {
        switch(type) {
            case 'Frecciarossa': return 'bg-red-600';
            case 'Italo': return 'bg-red-800';
            case 'Intercity': return 'bg-blue-600';
            case 'Regionale': return 'bg-green-600';
            default: return 'bg-gray-500';
        }
    }

    const bookingUrl = `https://www.trenitalia.com/en/purchase.html?departureStation=${encodeURIComponent(getStationName(departure))}&arrivalStation=${encodeURIComponent(getStationName(destination))}&departureDate=${searchDate}&departureTime=${train.departureTime}`;

    return (
        <div className="bg-brand-surface rounded-xl p-4 sm:p-6 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-in">
            <div className="flex-grow w-full">
                <div className="flex justify-between items-center mb-4">
                    <div className={`text-xs font-bold text-white px-2 py-0.5 rounded-full ${getTrainTypeColor(train.trainType)}`}>
                        {train.trainType}
                    </div>
                    <div className="text-sm text-brand-text-muted font-mono">{train.trainNumber}</div>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <div className="text-center">
                        <p className="text-xl sm:text-2xl font-bold text-brand-primary">{train.departureTime}</p>
                    </div>
                    <div className="flex-grow text-center">
                        <div className="text-sm text-brand-text-muted">{train.duration}</div>
                        <div className="relative w-full h-0.5 bg-brand-border my-1">
                            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-2 h-2 rounded-full bg-brand-text-muted"></div>
                            <div className="absolute top-1/2 -translate-y-1/2 right-0 w-2 h-2 rounded-full bg-brand-accent"></div>
                        </div>
                    </div>
                    <div className="text-center">
                        <p className="text-xl sm:text-2xl font-bold text-brand-primary">{train.arrivalTime}</p>
                    </div>
                </div>
            </div>
            <div className="w-full sm:w-auto sm:border-l sm:pl-6 border-t sm:border-t-0 pt-4 sm:pt-0 border-brand-border flex flex-row sm:flex-col justify-between sm:justify-center items-center gap-2">
                 <p className="text-2xl font-bold text-brand-accent">€{train.price.toFixed(2)}</p>
                 <a 
                    href={bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-brand-accent text-white font-semibold px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors text-sm text-center"
                 >
                    Select
                </a>
            </div>
        </div>
    );
}

const Trains: React.FC = () => {
    const [departure, setDeparture] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [timeType, setTimeType] = useState<'depart' | 'arrive'>('depart');
    const [trains, setTrains] = useState<TrainTime[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searched, setSearched] = useState(false);

    const generateTimeOptions = () => {
        const options = [];
        for (let h = 0; h < 24; h++) {
            for (let m = 0; m < 60; m += 30) {
                const hour = String(h).padStart(2, '0');
                const minute = String(m).padStart(2, '0');
                options.push(`${hour}:${minute}`);
            }
        }
        return options;
    };
    const timeOptions = generateTimeOptions();

    const getFormattedDate = (offsetDays: number = 0): string => {
        const d = new Date();
        d.setDate(d.getDate() + offsetDays);
        return d.toISOString().split('T')[0];
    };

    const handleSearch = async () => {
        if (!departure || !destination || departure === destination) {
            setError("Please select a valid departure and destination.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setSearched(true);
        setTrains([]);

        try {
            const results = await fetchTrainTimes(departure, destination, time, timeType);
            setTrains(results);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    const isSearchDisabled = !departure || !destination || departure === destination || isLoading;
    const searchDateForBooking = date || new Date().toISOString().split('T')[0];

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
                <Icon name="train" className="w-10 h-10 text-brand-accent" />
                <h1 className="text-4xl font-extrabold text-brand-primary ml-3">Train Schedules</h1>
            </div>

            <div className="bg-brand-surface p-6 rounded-xl shadow-subtle mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <div>
                        <label htmlFor="departure" className="block text-sm font-medium text-brand-text-muted mb-1">From</label>
                        <select
                            id="departure"
                            value={departure}
                            onChange={(e) => setDeparture(e.target.value)}
                            className="w-full p-3 bg-brand-background border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition"
                        >
                            <option value="">Select Departure</option>
                            {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="destination" className="block text-sm font-medium text-brand-text-muted mb-1">To</label>
                        <select
                            id="destination"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="w-full p-3 bg-brand-background border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition"
                        >
                            <option value="">Select Destination</option>
                            {locations.filter(l => l !== departure).map(loc => <option key={loc} value={loc}>{loc}</option>)}
                        </select>
                    </div>
                </div>
                 {departure && departure === destination && (
                    <p className="text-red-500 text-sm mt-2">Departure and destination cannot be the same.</p>
                 )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mt-4 border-t border-brand-border pt-4">
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-brand-text-muted mb-1">Date (Optional)</label>
                        <div className="flex items-center gap-2">
                            <input
                                id="date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full p-3 bg-brand-background border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition"
                            />
                            <button onClick={() => setDate(getFormattedDate(0))} title="Set to Today" className="flex-shrink-0 px-4 py-3 bg-brand-background border border-brand-border text-brand-text-muted rounded-lg hover:bg-brand-border transition-colors text-sm font-medium">Today</button>
                            <button onClick={() => setDate(getFormattedDate(1))} title="Set to Tomorrow" className="flex-shrink-0 px-3 py-3 bg-brand-background border border-brand-border text-brand-text-muted rounded-lg hover:bg-brand-border transition-colors text-sm font-medium">Tmrw</button>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="time" className="block text-sm font-medium text-brand-text-muted mb-1">Time (Optional)</label>
                         <select
                            id="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full p-3 pr-10 bg-brand-background border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition appearance-none"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                backgroundPosition: 'right 0.5rem center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: '1.5em 1.5em',
                            }}
                        >
                            <option value="">Any Time</option>
                            {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-brand-text-muted mb-2">Search relative to time</label>
                        <div className="flex space-x-4">
                            <label className="flex items-center text-sm cursor-pointer">
                                <input type="radio" name="timeType" value="depart" checked={timeType === 'depart'} onChange={() => setTimeType('depart')} className="h-4 w-4 text-brand-accent focus:ring-brand-accent border-gray-300" />
                                <span className="ml-2 text-brand-text-main">Depart After</span>
                            </label>
                            <label className="flex items-center text-sm cursor-pointer">
                                <input type="radio" name="timeType" value="arrive" checked={timeType === 'arrive'} onChange={() => setTimeType('arrive')} className="h-4 w-4 text-brand-accent focus:ring-brand-accent border-gray-300" />
                                <span className="ml-2 text-brand-text-main">Arrive By</span>
                            </label>
                        </div>
                    </div>
                    <div className="flex sm:justify-end items-end">
                        <button
                            onClick={handleSearch}
                            disabled={isSearchDisabled}
                            className="w-full sm:w-auto p-3 bg-brand-accent text-white font-semibold rounded-lg hover:bg-opacity-90 transition-colors disabled:bg-brand-accent/50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Searching...' : 'Find Trains'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {isLoading && (
                    <div className="flex justify-center items-center py-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-accent"></div>
                    </div>
                )}
                {error && (
                    <div className="text-center text-red-500 bg-red-50/50 p-4 rounded-lg">
                        <h3 className="font-bold">Search Error</h3>
                        <p>{error}</p>
                    </div>
                )}
                {!isLoading && !error && searched && trains.length > 0 && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-brand-primary">Available Trains: {departure} &rarr; {destination}</h2>
                        {trains.map((train, index) => (
                            <TrainCard key={index} train={train} departure={departure} destination={destination} searchDate={searchDateForBooking}/>
                        ))}
                    </div>
                )}
                {!isLoading && !error && searched && trains.length === 0 && (
                     <div className="text-center py-10 px-4 bg-brand-surface rounded-xl shadow-subtle">
                        <p className="text-brand-text-muted font-semibold text-lg">No trains found matching your criteria.</p>
                        <p className="text-brand-text-muted text-sm">Please adjust your search options or try a different route.</p>
                    </div>
                )}
                {!isLoading && !error && !searched && (
                    <div className="text-center py-10 px-4 bg-brand-surface rounded-xl shadow-subtle">
                        <Icon name="train" className="w-12 h-12 text-brand-border mx-auto mb-4" />
                        <p className="text-brand-text-muted font-semibold text-lg">Find your train connection in Italy.</p>
                        <p className="text-brand-text-muted text-sm">Select your route above to begin.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Trains;
