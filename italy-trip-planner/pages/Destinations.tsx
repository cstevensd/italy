
import React, { useState, useCallback } from 'react';
import { generateDestinationGuide } from '../services/geminiService';
import { DestinationGuideData, CuratedGuideContent, GuideListItem, GuideSection } from '../types';
import { curatedGuides } from '../data/guidesData';
import { Icon } from '../components/Icon';

const destinationCities = [
    { name: 'Rome', image: 'https://media.istockphoto.com/id/539115110/photo/colosseum-in-rome-and-morning-sun-italy.jpg?s=612x612&w=0&k=20&c=9NtFxHI3P2IBWRY9t0NrfPZPR4iusHmVLbXg2Cjv9Fs=' },
    { name: 'Florence', image: 'https://media.istockphoto.com/id/1142237436/photo/florence-in-italy-with-the-great-dome-of-the-cathedral.jpg?s=612x612&w=0&k=20&c=z1emKf6-wIU8NCmYyjmGFhjudaF8veqvw8FC8zle7tI=' },
    { name: 'Tuscany', image: 'https://www.citalia.com/-/media/Bynder/Citalia-destinations/Italy/Countryside/Tuscany-Countryside/Destination/Tuscany-2023-Countryside-View-Shutterstock-1613838031-Hybris.jpg?rev=5160a44fc2114b428fadcfae309be67f&hash=8E845A75529F4D2BB3ABBD522F04C110g' },
    { name: 'Pisa', image: 'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM3fHx8ZW58MHx8fHx8' },
    { name: 'Cinque Terre', image: 'https://www.danflyingsolo.com/wp-content/uploads/2016/03/cinqueterreuntitled-.jpg' },
];

const AIGuideDisplay: React.FC<{ data: DestinationGuideData }> = ({ data }) => (
    <div className="space-y-6 animate-fade-in text-left w-full">
        <div>
            <h3 className="text-xl font-bold text-brand-accent mb-2">Overview</h3>
            <p className="text-brand-text-muted leading-relaxed">{data.overview}</p>
        </div>
        <div>
            <h3 className="text-xl font-bold text-brand-accent mb-2">Places to Visit</h3>
            <ul className="space-y-2 text-brand-text-muted">
                {data.placesToVisit.map((place, i) => (
                    <li key={i}>
                        <a href={place.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center group">
                           <Icon name="map-pin" className="w-4 h-4 mr-2.5 text-brand-text-muted group-hover:text-brand-accent transition-colors" />
                           <span className="group-hover:text-brand-accent group-hover:underline transition-colors">{place.name}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
        <div>
            <h3 className="text-xl font-bold text-brand-accent mb-2">Things to Do</h3>
            <ul className="list-disc list-inside space-y-1 text-brand-text-muted">
                {data.thingsToDo.map((activity, i) => <li key={i}>{activity}</li>)}
            </ul>
        </div>
        <div>
            <h3 className="text-xl font-bold text-brand-accent mb-2">Local Tips</h3>
            <ul className="space-y-3 text-brand-text-muted">
                {data.localTips.map((tip, i) => (
                    <li key={i} className="flex items-start">
                        <Icon name="check" className="w-4 h-4 mr-3 mt-1 flex-shrink-0 text-brand-accent/70" />
                        <div>
                           {tip.description}
                           {tip.googleMapsUrl && tip.name && (
                                <a href={tip.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center group ml-1 text-brand-accent font-medium">
                                    <span className="group-hover:underline transition-colors">({tip.name})</span>
                                    <Icon name="link" className="w-3.5 h-3.5 ml-1 opacity-80 group-hover:opacity-100" />
                                </a>
                           )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

const CuratedGuideDisplay: React.FC<{ data: CuratedGuideContent }> = ({ data }) => (
  <div className="space-y-8 animate-fade-in text-left w-full">
    {data.overviewText && (
      <div>
        <h3 className="text-2xl font-bold text-brand-accent mb-3">{data.name}</h3>
        <p className="text-brand-text-muted leading-relaxed">{data.overviewText}</p>
      </div>
    )}
    {data.sections.map((section, i) => (
      <div key={i}>
        <h4 className="text-xl font-bold text-brand-accent mb-3 border-b border-brand-border pb-2">{section.title}</h4>
        {typeof section.content === 'string' ? (
          <p className="text-brand-text-muted leading-relaxed">{section.content}</p>
        ) : (
          <ul className="space-y-4">
            {(section.content as GuideListItem[]).map((item, j) => (
              <li key={j} className="text-brand-text-muted">
                <p className="font-bold text-brand-text-main">{item.name}</p>
                {item.description && <p className="mt-1 text-sm">{item.description}</p>}
                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                    {item.address && (
                        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.address)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center group text-sm font-medium">
                           <Icon name="map-pin" className="w-4 h-4 mr-1.5 text-brand-text-muted group-hover:text-brand-accent transition-colors" />
                           <span className="group-hover:text-brand-accent group-hover:underline transition-colors">{item.address}</span>
                        </a>
                    )}
                    {item.url && (
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center group text-sm font-medium">
                           <Icon name="link" className="w-4 h-4 mr-1.5 text-brand-text-muted group-hover:text-brand-accent transition-colors" />
                           <span className="group-hover:text-brand-accent group-hover:underline transition-colors">Visit Website</span>
                        </a>
                    )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    ))}
  </div>
);

const Destinations: React.FC = () => {
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [guideData, setGuideData] = useState<DestinationGuideData | null>(null);
    const [curatedData, setCuratedData] = useState<CuratedGuideContent | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCitySelect = useCallback(async (city: string) => {
        if (selectedCity === city && (guideData || curatedData)) return;

        setSelectedCity(city);
        setIsLoading(true);
        setError(null);
        setGuideData(null);
        setCuratedData(null);

        // Check for a curated guide first
        if (curatedGuides[city]) {
            setTimeout(() => { // Simulate network delay for better UX
                setCuratedData(curatedGuides[city]);
                setIsLoading(false);
            }, 300);
        } else {
            // Fallback to AI guide
            try {
                const data = await generateDestinationGuide(city);
                setGuideData(data);
            } catch (err: any) {
                setError(err.message || 'An unknown error occurred.');
            } finally {
                setIsLoading(false);
            }
        }
    }, [selectedCity, guideData, curatedData]);

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-extrabold text-brand-primary mb-2">Destination Guides</h1>
            <p className="text-brand-text-muted mb-8">Select a destination to see a curated guide or generate an up-to-date AI guide.</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                {destinationCities.map(city => (
                     <button
                        key={city.name}
                        onClick={() => handleCitySelect(city.name)}
                        className={`relative h-40 rounded-xl overflow-hidden group focus:outline-none transition-all duration-300 transform hover:-translate-y-1 ${
                            selectedCity === city.name
                                ? 'ring-4 ring-brand-accent shadow-lifted'
                                : 'ring-1 ring-brand-border hover:ring-brand-accent'
                        }`}
                    >
                        <img src={city.image} alt={city.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <h3 className="absolute bottom-3 left-3 text-white text-lg font-bold">{city.name}</h3>
                    </button>
                ))}
            </div>

            <div className="bg-brand-surface p-8 rounded-xl shadow-subtle min-h-[300px] flex items-center justify-center">
                {isLoading && (
                     <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-accent"></div>
                        <p className="text-brand-text-muted mt-4">Loading guide for {selectedCity}...</p>
                     </div>
                )}
                {error && (
                    <div className="text-center text-red-500">
                        <h3 className="font-bold text-lg">Error Generating Guide</h3>
                        <p className="text-sm">{error}</p>
                    </div>
                )}
                {!isLoading && !error && curatedData && <CuratedGuideDisplay data={curatedData} />}
                {!isLoading && !error && guideData && <AIGuideDisplay data={guideData} />}
                {!isLoading && !error && !guideData && !curatedData && (
                     <p className="text-brand-text-muted text-lg">Please select a city to see its guide.</p>
                )}
            </div>
        </div>
    );
};

export default Destinations;
