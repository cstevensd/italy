
import React from 'react';
import { italianPhrases } from '../data/phrasesData';
import { Icon } from '../components/Icon';

const Phrases: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-8">
        <Icon name="speech-bubble" className="w-10 h-10 text-brand-accent" />
        <h1 className="text-4xl font-extrabold text-brand-primary ml-3">Useful Italian Phrases</h1>
      </div>

      <div className="space-y-8">
        {italianPhrases.map((category, index) => (
          <div key={category.category} className="bg-brand-surface p-6 rounded-xl shadow-subtle animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
            <h2 className="text-2xl font-bold text-brand-accent mb-4 border-b border-brand-border pb-2">{category.category}</h2>
            <ul className="space-y-4">
              {category.phrases.map(phrase => (
                <li key={phrase.italian} className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 p-2 rounded-lg hover:bg-brand-background transition-colors">
                  <p className="font-semibold text-brand-text-main">{phrase.italian}</p>
                  <p className="text-brand-text-muted">{phrase.english}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Phrases;
