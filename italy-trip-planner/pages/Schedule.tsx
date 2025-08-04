
import React from 'react';
import { schedule } from '../data/tripData';
import { Icon } from '../components/Icon';
import Countdown from '../components/Countdown';

const Schedule: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-8">
        <Icon name="calendar" className="w-10 h-10 text-brand-accent" />
        <h1 className="text-4xl font-extrabold text-brand-primary ml-3">Trip Schedule</h1>
      </div>
      
      <Countdown schedule={schedule} />

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-brand-border rounded-full"></div>

        <div className="space-y-8">
          {schedule.map((item, index) => (
            <div key={index} className="relative flex items-start animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-accent flex items-center justify-center text-white font-bold text-lg z-10 shadow-md">
                {item.date.split(' ')[1]}
              </div>
              <div className="ml-6 flex-grow bg-brand-surface p-6 rounded-xl shadow-subtle">
                <p className="text-sm font-semibold text-brand-text-muted">{item.date}</p>
                <h3 className="font-bold text-xl text-brand-text-main mt-1">{item.activity}</h3>
                <p className="text-brand-text-muted mt-2">{item.notes}</p>
                
                {(item.link || item.address) && (
                    <div className="flex flex-wrap gap-3 mt-4">
                        {item.link && (
                          <a 
                            href={item.link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center bg-brand-accent-light text-brand-accent font-semibold px-3 py-1.5 rounded-lg hover:bg-brand-accent hover:text-white transition-colors text-sm"
                          >
                            <Icon name="link" className="w-4 h-4 mr-2" />
                            {item.link.text}
                          </a>
                        )}
                        {item.address && (
                          <a 
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center bg-gray-100 text-brand-text-muted font-semibold px-3 py-1.5 rounded-lg hover:bg-brand-border transition-colors text-sm"
                          >
                            <Icon name="map-pin" className="w-4 h-4 mr-2" />
                            View on Map
                          </a>
                        )}
                    </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
