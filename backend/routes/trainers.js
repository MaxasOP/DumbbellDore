const express = require('express');
const TrainerProfile = require('../models/TrainerProfile');
const Booking = require('../models/Booking');
const { authRequired } = require('../middleware/authMiddleware');
const { limiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.get('/nearby', async (req, res, next) => {
  const filter = { is_active: true, is_verified: true };
  const { specialization, type } = req.query;
  const specialties = TrainerProfile.schema.path('specialization').enumValues;
  if (specialties.includes(specialization)) filter.specialization = specialization;
  if (type === 'online') filter.is_online_available = true;
  if (type === 'offline') filter.services_offered = 'in_person';
  if (type === 'hybrid') {
    filter.is_online_available = true;
    filter.services_offered = 'in_person';
  }

  try {
    const trainers = await TrainerProfile.find(filter)
      .select('full_name specialization profile_picture years_experience price_per_session currency average_rating city')
      .sort({ average_rating: -1, _id: 1 })
      .limit(50);
    res.json(trainers);
  } catch (error) {
    next(error);
  }
});

router.post('/:trainerId/book', authRequired, limiter, async (req, res, next) => {
  const sessionDate = new Date(req.body.date);
  if (!Number.isFinite(sessionDate.getTime()) || sessionDate <= new Date()) {
    return res.status(400).json({ error: 'Choose a future date and time' });
  }

  try {
    const trainer = await TrainerProfile.findOne({
      _id: req.params.trainerId,
      is_active: true,
      is_verified: true,
    }).select('is_online_available services_offered session_duration_minutes price_per_session currency');
    if (!trainer) return res.status(404).json({ error: 'Trainer not found' });
    if (!trainer.session_duration_minutes || trainer.price_per_session == null) {
      return res.status(409).json({ error: 'This trainer has not set up session requests' });
    }

    const endDate = new Date(sessionDate.getTime() + trainer.session_duration_minutes * 60000);
    const booking = await Booking.create({
      booking_type: 'trainer',
      user_id: req.user.id,
      service_provider_id: trainer.id,
      session_date: sessionDate,
      start_time: sessionDate.toISOString().slice(11, 16),
      end_time: endDate.toISOString().slice(11, 16),
      duration_minutes: trainer.session_duration_minutes,
      session_type: trainer.is_online_available ? 'online' : 'in_person',
      price: trainer.price_per_session,
      currency: trainer.currency,
      status: 'requested',
    });
    res.status(201).json({ id: booking.id, status: booking.status });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
