const ProgramControllers = require("../Controllers/Program");

const router = require("express").Router();

router.post("/save", ProgramControllers.save);
router.post("/getall", ProgramControllers.getAllPrograms);
router.post("/submit", ProgramControllers.submitProgram);

module.exports = router;
