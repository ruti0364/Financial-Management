const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  deleteProfile
} = require('../controllers/profileController');

router.get('/:id', getProfile);
router.put('/:id', updateProfile);
router.delete('/:id', deleteProfile);

module.exports = router;