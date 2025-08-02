
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Countdown from '../components/Countdown';
import { travelers, todoList } from '../data/tripData';
import { Icon } from '../components/Icon';

const QuickLink: React.FC<{ to: string, title: string, description: string, icon: string }> = ({ to, title, description, icon }) => (
    <Link to={to} className="bg-brand-surface p-6 rounded-xl shadow-subtle hover:shadow-lifted hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
        <div>
            <Icon name={icon} className="w-8 h-8 text-brand-accent mb-3" />
            <h3 className="font-bold text-lg text-brand-text-main">{title}</h3>
            <p className="text-brand-text-muted mt-1">{description}</p>
        </div>
        <div className="text-right text-brand-accent font-semibold mt-4 transition-transform group-hover:translate-x-1">View &rarr;</div>
    </Link>
);


const Home: React.FC = () => {
  const [selectedTraveler, setSelectedTraveler] = useState<string>(travelers[0]);
  const [nextTask, setNextTask] = useState<string | null>(null);

  useEffect(() => {
    const travelersNextTask = todoList.find(task => 
        !task.completed && task.assignees.includes(selectedTraveler)
    );
    setNextTask(travelersNextTask ? travelersNextTask.task : "All tasks complete!");
  }, [selectedTraveler]);

  return (
    <div className="space-y-12">
        <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden animate-fade-in">
            <img src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/1-italy-poster-alexey-erofalov.jpg" alt="Viva Italia travel poster collage" className="absolute inset-0 w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative h-full flex flex-col items-center justify-center text-white text-center p-4">
                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">Italia 2025</h1>
                <p className="mt-2 text-lg sm:text-xl max-w-2xl opacity-90">Woop woop</p>
                <div className="mt-8">
                    <Countdown />
                </div>
            </div>
        </div>
      
      <div className="bg-brand-surface p-6 rounded-xl shadow-subtle flex flex-col justify-center">
          <h2 className="text-xl font-bold text-brand-text-main mb-4">Travelers & Reminders</h2>
          <div className='flex flex-col md:flex-row md:justify-between gap-6'>
            <div className="flex flex-wrap gap-x-2 gap-y-3">
                {travelers.map(name => (
                    <button
                        key={name}
                        onClick={() => setSelectedTraveler(name)}
                        className={`flex items-center space-x-2 p-2 rounded-lg transition-colors duration-200 ${selectedTraveler === name ? 'bg-brand-accent-light' : 'hover:bg-gray-100'}`}
                        aria-pressed={selectedTraveler === name}
                    >
                        <Icon name="user" className={`w-6 h-6 transition-colors ${selectedTraveler === name ? 'text-brand-accent' : 'text-brand-text-muted'}`}/>
                        <span className={`text-lg font-medium transition-colors ${selectedTraveler === name ? 'text-brand-accent' : 'text-brand-text-main'}`}>{name}</span>
                    </button>
                ))}
            </div>
            <div className="md:border-l border-brand-border md:pl-6">
                <h3 className="font-semibold text-brand-text-main">Next Task for <span className="text-brand-accent">{selectedTraveler}</span>:</h3>
                <p className="text-brand-secondary text-lg font-semibold">{nextTask || 'Finding task...'}</p>
            </div>
          </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-brand-primary mb-6 text-center lg:text-left">Trip Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <QuickLink to="/schedule" title="Schedule" description="Daily itinerary and plans" icon="calendar" />
            <QuickLink to="/bookings" title="Bookings" description="Flights & lodgings" icon="plane" />
            <QuickLink to="/todo" title="To-Do List" description="Pre-trip preparations" icon="list" />
            <QuickLink to="/destinations" title="Guides" description="City info & local tips" icon="book-open" />
            <QuickLink to="/phrases" title="Phrases" description="Useful Italian vocabulary" icon="speech-bubble" />
        </div>
      </div>
    </div>
  );
};

export default Home;
