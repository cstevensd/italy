
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from './Icon';

const NavItem: React.FC<{ to: string; children: React.ReactNode; onClick?: () => void }> = ({ to, children, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `block md:inline-block px-3 py-2 rounded-md text-base font-semibold transition-colors ${
          isActive
            ? 'text-brand-accent'
            : 'text-brand-text-main hover:text-brand-accent'
        }`
      }
    >
      {children}
    </NavLink>
  );
};

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { path: '/', name: 'Home' },
        { path: '/schedule', name: 'Schedule' },
        { path: '/bookings', name: 'Bookings' },
        { path: '/trains', name: 'Trains' },
        { path: '/todo', name: 'To-Do' },
        { path: '/destinations', name: 'Guides' },
        { path: '/phrases', name: 'Phrases' },
    ];

  return (
    <nav className="bg-brand-surface/80 backdrop-blur-lg shadow-subtle sticky top-0 z-50 border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Icon name="flag" className="h-8 w-8 text-brand-accent"/>
            <span className="text-brand-primary font-extrabold ml-3 text-xl">Italy Trip '25</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2">
              {navItems.map(item => <NavItem key={item.path} to={item.path}>{item.name}</NavItem>)}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-transparent inline-flex items-center justify-center p-2 rounded-md text-brand-text-main hover:text-brand-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-accent"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <Icon name="close" className="block h-6 w-6" /> : <Icon name="menu" className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
        {isOpen && (
            <div className="md:hidden" id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                     {navItems.map(item => (
                        <NavItem key={item.path} to={item.path} onClick={() => setIsOpen(false)}>{item.name}</NavItem>
                     ))}
                </div>
            </div>
        )}
    </nav>
  );
};

export default Header;
