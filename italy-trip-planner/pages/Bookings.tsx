import React, { useState } from 'react';
import { flights, accommodations } from '../data/tripData';
import { Flight, Accommodation, FlightDetails } from '../types';
import { Icon } from '../components/Icon';

const airlineManageBookingLinks: { [key: string]: string } = {
  'Air Transat': 'https://www.airtransat.com/en-CA/my-booking',
  'ITA Airways': 'https://www.ita-airways.com/en_gb',
};

const FlightDetailRow: React.FC<{ label: string; value?: string }> = ({ label, value }) => {
    if (!value) return null;
    return (
        <p className="text-sm text-brand-text-muted"><span className="font-semibold text-brand-text-main">{label}:</span> {value}</p>
    )
}

const FlightLeg: React.FC<{ leg: FlightDetails, type: 'Outbound' | 'Return' }> = ({ leg, type }) => (
    <div>
        <h4 className="font-bold text-lg text-brand-secondary mb-2">{type}</h4>
        <div className="space-y-1.5">
            <FlightDetailRow label="Airline" value={`${leg.airline} (${leg.flightNumber})`} />
            <FlightDetailRow label="Departure" value={leg.departure} />
            <FlightDetailRow label="Arrival" value={leg.arrival} />
            <FlightDetailRow label="Duration" value={leg.duration} />
            <FlightDetailRow label="Seats" value={leg.seats} />
        </div>
    </div>
);


const FlightCard: React.FC<{ flight: Flight }> = ({ flight }) => {
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    const handleCopy = (codeToCopy: string) => {
        navigator.clipboard.writeText(codeToCopy).then(() => {
            setCopiedCode(codeToCopy);
            setTimeout(() => {
                setCopiedCode(null);
            }, 2000); // Reset after 2 seconds
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    return (
        <div className="bg-brand-surface rounded-xl p-6 shadow-subtle">
            <h3 className="text-xl font-bold text-brand-text-main mb-4">{flight.travelers}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FlightLeg leg={flight.outbound} type="Outbound" />
                <FlightLeg leg={flight.return} type="Return" />
            </div>
            <div className="mt-6 border-t border-brand-border pt-4">
                <h4 className="font-bold text-lg text-brand-secondary mb-3">Confirmation Codes</h4>
                <div className="space-y-3">
                    {flight.confirmationCodes.map(c => {
                        const manageLink = airlineManageBookingLinks[c.provider];
                        const isAirlineCode = !!manageLink;

                        return (
                            <div key={c.code} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <p className="text-sm text-brand-text-muted whitespace-nowrap">
                                    <span className="font-semibold text-brand-text-main">{c.provider}:</span>
                                    <span className="font-mono ml-2 p-1 bg-brand-background rounded">{c.code}</span>
                                </p>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    {isAirlineCode && (
                                        <button
                                            onClick={() => handleCopy(c.code)}
                                            className="inline-flex items-center bg-gray-100 text-brand-text-muted font-semibold px-3 py-1.5 rounded-lg hover:bg-brand-border transition-all duration-200 text-sm w-32 justify-center"
                                            aria-label={`Copy confirmation code ${c.code}`}
                                        >
                                            <Icon name={copiedCode === c.code ? 'check' : 'copy'} className="w-4 h-4 mr-2 transition-all" />
                                            {copiedCode === c.code ? 'Copied!' : 'Copy Code'}
                                        </button>
                                    )}
                                    {manageLink && (
                                        <a
                                            href={manageLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex flex-shrink-0 items-center bg-brand-accent-light text-brand-accent font-semibold px-3 py-1.5 rounded-lg hover:bg-brand-accent hover:text-white transition-colors text-sm"
                                        >
                                            <Icon name="link" className="w-4 h-4 mr-2" />
                                            Manage Booking
                                        </a>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const AccommodationCard: React.FC<{ accom: Accommodation }> = ({ accom }) => (
    <div className="bg-brand-surface rounded-xl shadow-subtle flex flex-col overflow-hidden transition-shadow hover:shadow-lifted">
        <img src={accom.imageUrl} alt={`View of ${accom.name}`} className="w-full h-48 object-cover" />
        <div className="p-6 flex flex-col flex-grow">
            <div className="flex-grow">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-bold text-brand-accent">{accom.city}</p>
                        <h3 className="text-xl font-bold text-brand-text-main">{accom.name}</h3>
                        <p className="text-sm text-brand-text-muted">{accom.provider}</p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                        <p className="font-semibold text-brand-text-main">{accom.dates}</p>
                    </div>
                </div>
            </div>
            <div className="mt-4 border-t border-brand-border pt-4 space-y-4">
                <div className="flex items-start">
                    <Icon name="map-pin" className="w-4 h-4 text-brand-text-muted mr-2 flex-shrink-0 mt-0.5" />
                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(accom.address)}`} target="_blank" rel="noopener noreferrer" className="text-brand-text-muted hover:text-brand-primary transition-colors text-sm">
                        {accom.address}
                    </a>
                </div>
                {accom.bookingLink && (
                     <a 
                        href={accom.bookingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full bg-brand-accent-light text-brand-accent font-semibold px-3 py-2 rounded-lg hover:bg-brand-accent hover:text-white transition-colors text-sm"
                      >
                          <Icon name="link" className="w-4 h-4 mr-2" />
                          View Booking Details
                      </a>
                )}
            </div>
        </div>
    </div>
);

const Bookings: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div>
        <div className="flex items-center mb-6">
          <Icon name="plane" className="w-10 h-10 text-brand-accent" />
          <h1 className="text-4xl font-extrabold text-brand-primary ml-3">Flights</h1>
        </div>
        <div className="space-y-6">
          {flights.map((flight, index) => <FlightCard key={index} flight={flight} />)}
        </div>
      </div>
      <div>
        <div className="flex items-center mb-6">
          <Icon name="bed" className="w-10 h-10 text-brand-accent" />
          <h1 className="text-4xl font-extrabold text-brand-primary ml-3">Accommodations</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {accommodations.map((accom, index) => <AccommodationCard key={index} accom={accom} />)}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
