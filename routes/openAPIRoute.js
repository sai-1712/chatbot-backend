const express = require('express');
const router = express.Router();

const {responseFromOpenApi} = require("../controller/openAPIController")

router.post('/getResponse', responseFromOpenApi);

module.exports = router;