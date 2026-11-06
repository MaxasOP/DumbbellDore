'use client';

import React, { useState, useEffect, useContext } from 'react';
import api from '../../api';
import { AuthContext } from '../../AuthContext';

function TrainerMarketplaceContent() {
  const { user } = useContext(AuthContext);
  const [trainers, setTrainers] = useState([]);
  const [filters, setFilters] = useState({
    specialization: 'all',
    type: 'all'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTrainers();
  }, [filters]);

  const fetchTrainers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/trainers/nearby', { params: filters });
      setTrainers(response.data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const bookTrainer = async (trainerId, date) => {
    if (!user) { window.location.assign("/auth"); return; }
    try {
      await api.post(`/trainers/${trainerId}/book`, { date: new Date(date).toISOString() });
      alert('Booking request saved. The session is pending confirmation.');
    } catch (error) {
      alert(error.response?.data?.error || 'Could not save booking request.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">👨‍🏫 Trainer Marketplace</h1>
        <p className="text-gray-600 mb-8">Browse verified trainers and request a session when you’re signed in.</p>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
              <select
                value={filters.specialization}
                onChange={(e) => setFilters({ ...filters, specialization: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Specializations</option>
                <option value="strength_training">Strength Training</option>
                <option value="cardio">Cardio</option>
                <option value="yoga">Yoga</option>
                <option value="nutrition">Nutrition</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={fetchTrainers}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {loading && <p role="status">Loading trainers…</p>}
        {!loading && trainers.length === 0 && <p>No verified trainers match these filters.</p>}
        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trainers.map((trainer) => (
            <TrainerCard
              key={trainer._id || trainer.id}
              trainer={trainer}
              onBook={date => bookTrainer(trainer._id || trainer.id, date)}
              canBook={Boolean(user)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const TrainerCard = ({ trainer, onBook, canBook }) => {
  const [date, setDate] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try { await onBook(date); } finally { setSubmitting(false); }
  }

  return (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
    {trainer.profile_picture && (
      <img src={trainer.profile_picture} alt={trainer.full_name} className="w-full h-48 object-cover object-[center_20%]" />
    )}
    <div className="p-6">
      <h3 className="text-lg font-bold text-gray-900">{trainer.full_name}</h3>
      <p className="text-sm text-gray-600 mt-1">{trainer.specialization}</p>
      
      <div className="mt-4 space-y-2 text-sm">
        <p>
          <span className="text-gray-600">Experience:</span>
          <span className="ml-2 font-semibold">{trainer.years_experience} years</span>
        </p>
        <p>
          <span className="text-gray-600">Rate:</span>
          <span className="ml-2 font-semibold text-green-600">{trainer.price_per_session == null ? 'Contact trainer' : `${trainer.currency || 'INR'} ${trainer.price_per_session} / session`}</span>
        </p>
        <p>
          <span className="text-gray-600">Rating:</span>
          <span className="ml-2 font-semibold">{trainer.average_rating == null ? 'No ratings yet' : `${trainer.average_rating}/5`}</span>
        </p>
      </div>

      <form className="mt-4 space-y-2" onSubmit={submit}>
        {canBook && (
          <label className="block text-sm">
            Preferred local date and time
            <input className="block w-full" type="datetime-local" required value={date} onChange={event => setDate(event.target.value)} />
          </label>
        )}
        <button type="submit" disabled={submitting} className="btn-core-primary !py-2.5 text-sm">
          {submitting ? 'Saving…' : canBook ? 'Request session' : 'Sign in to request a session'}
        </button>
      </form>
    </div>
  </div>
  );
};

export default function TrainerMarketplace() {
  return <TrainerMarketplaceContent />;
}
