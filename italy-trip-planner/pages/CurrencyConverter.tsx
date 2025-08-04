
import React, { useState, useEffect } from 'react';
import { Icon } from '../components/Icon';
import { Currency } from '../types';

// Hardcoded rates relative to USD for approximation
const baseRates = {
  USD: 1,
  CAD: 1.37,
  EUR: 0.92,
};

const currencyDetails: { [key in Currency]: { name: string, symbol: string } } = {
    USD: { name: 'US Dollar', symbol: '$' },
    CAD: { name: 'Canadian Dollar', symbol: '$' },
    EUR: { name: 'Euro', symbol: '€' },
};

const currencyOptions: Currency[] = ['CAD', 'USD', 'EUR'];

const CurrencyConverter: React.FC = () => {
    const [amount, setAmount] = useState('100');
    const [fromCurrency, setFromCurrency] = useState<Currency>('CAD');
    const [toCurrency, setToCurrency] = useState<Currency>('EUR');
    const [convertedAmount, setConvertedAmount] = useState<string | null>(null);

    const convert = (value: number, from: Currency, to: Currency): string => {
        if (from === to) return value.toFixed(2);
        const valueInUsd = value / baseRates[from];
        const result = valueInUsd * baseRates[to];
        return result.toFixed(2);
    };

    useEffect(() => {
        const numericAmount = parseFloat(amount);
        if (!isNaN(numericAmount) && numericAmount > 0) {
            const result = convert(numericAmount, fromCurrency, toCurrency);
            setConvertedAmount(result);
        } else {
            setConvertedAmount(null);
        }
    }, [amount, fromCurrency, toCurrency]);

    const handleSwapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Allow only numbers and a single decimal point
        if (/^\d*\.?\d{0,2}$/.test(value)) {
            setAmount(value);
        }
    };

    return (
        <div className="max-w-2xl mx-auto animate-fade-in">
            <div className="flex items-center mb-8">
                <Icon name="currency" className="w-10 h-10 text-brand-accent" />
                <h1 className="text-4xl font-extrabold text-brand-primary ml-3">Currency Converter</h1>
            </div>

            <div className="bg-brand-surface p-6 sm:p-8 rounded-xl shadow-lifted space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <label htmlFor="from" className="block text-sm font-medium text-brand-text-muted mb-1">From</label>
                        <select
                            id="from"
                            value={fromCurrency}
                            onChange={(e) => setFromCurrency(e.target.value as Currency)}
                            className="w-full p-3 bg-brand-background border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition"
                        >
                            {currencyOptions.map(c => <option key={c} value={c}>{currencyDetails[c].name} ({c})</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="to" className="block text-sm font-medium text-brand-text-muted mb-1">To</label>
                        <select
                            id="to"
                            value={toCurrency}
                            onChange={(e) => setToCurrency(e.target.value as Currency)}
                            className="w-full p-3 bg-brand-background border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition"
                        >
                            {currencyOptions.map(c => <option key={c} value={c}>{currencyDetails[c].name} ({c})</option>)}
                        </select>
                    </div>
                </div>

                <div className="relative flex items-center justify-center">
                     <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-brand-border"></div>
                    </div>
                    <button
                        onClick={handleSwapCurrencies}
                        className="relative z-10 bg-brand-surface p-2 rounded-full border-2 border-brand-border text-brand-text-muted hover:text-brand-accent hover:border-brand-accent hover:rotate-180 transition-all duration-300"
                        aria-label="Swap currencies"
                    >
                        <Icon name="swap" className="w-6 h-6"/>
                    </button>
                </div>
                
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-brand-text-muted mb-1">Amount to Convert</label>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-brand-text-muted text-xl">{currencyDetails[fromCurrency].symbol}</span>
                        </div>
                        <input
                            type="text"
                            id="amount"
                            value={amount}
                            onChange={handleAmountChange}
                            className="w-full p-4 pl-10 text-3xl font-bold bg-brand-background border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition"
                            placeholder="0.00"
                        />
                    </div>
                </div>

                {convertedAmount && (
                    <div className="text-center pt-6 border-t border-brand-border">
                        <p className="text-lg text-brand-text-muted">{amount} {fromCurrency} equals</p>
                        <p className="text-5xl font-extrabold text-brand-accent mt-2">
                           {currencyDetails[toCurrency].symbol}{convertedAmount}
                           <span className="text-3xl font-bold text-brand-text-muted ml-2">{toCurrency}</span>
                        </p>
                    </div>
                )}

                <p className="text-xs text-brand-text-muted text-center pt-4">
                    *Rates are for planning purposes only and are based on approximate values (1 USD = 1.37 CAD, 1 USD = 0.92 EUR).
                </p>
            </div>
        </div>
    );
};

export default CurrencyConverter;
