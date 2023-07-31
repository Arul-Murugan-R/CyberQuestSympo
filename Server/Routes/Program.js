const ProgramControllers = require("../Controllers/Program");

const router = require("express").Router();

router.post("/save", ProgramControllers.save);
router.post("/getall", ProgramControllers.getAllPrograms);

module.exports = router;
