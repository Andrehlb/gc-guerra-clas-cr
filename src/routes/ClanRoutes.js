const express = require("express");
const ClanController = require("../controllers/ClanController");

const router = express.Router();

router.get("/clans", ClanController.listClans);

module.exports = router;