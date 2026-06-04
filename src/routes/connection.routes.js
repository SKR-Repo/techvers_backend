const express = require('express');
const { submitConnection } = require('../controllers/connection.controller');

const router = express.Router();

router.post('/', submitConnection);

module.exports = router;