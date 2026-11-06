const express = require('express');
const { authRequired } = require('../middleware/authMiddleware');
const User = require('../models/User');

const router = express.Router();

router.get('/streak', authRequired, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('current_yoga_streak');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ streak: user.current_yoga_streak });
  } catch (error) {
    next(error);
  }
});

router.put('/streak', authRequired, async (req, res, next) => {
  if (req.body.completed !== true) return res.status(400).json({ error: 'A completed session is required' });

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const yesterday = new Date(today.getTime() - 86400000);

  try {
    const user = await User.findByIdAndUpdate(req.user.id, [{
      $set: {
        current_yoga_streak: {
          $switch: {
            branches: [
              { case: { $eq: ['$last_yoga_session_day', today] }, then: '$current_yoga_streak' },
              { case: { $eq: ['$last_yoga_session_day', yesterday] }, then: { $add: [{ $ifNull: ['$current_yoga_streak', 0] }, 1] } }
            ],
            default: 1
          }
        },
        last_yoga_session_day: today
      }
    }], { new: true }).select('current_yoga_streak');

    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ streak: user.current_yoga_streak });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
