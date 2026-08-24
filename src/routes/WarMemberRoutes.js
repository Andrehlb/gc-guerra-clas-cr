const express = require('express');
const WarMemberController = require('../controllers/WarMemberController');

const router = express.Router();

router.get('/war-members/current', WarMemberController.getCurrent);

module.exports = router;
