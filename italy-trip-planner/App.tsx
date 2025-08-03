
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import Bookings from './pages/Bookings';
import TodoList from './pages/TodoList';
import Destinations from './pages/Destinations';
import Trains from './pages/Trains';
import Phrases from './pages/Phrases';

function App() {
  return (
    <div className="min-h-screen bg-brand-background font-sans antialiased">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/trains" element={<Trains />} />
          <Route path="/todo" element={<TodoList />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/phrases" element={<Phrases />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
