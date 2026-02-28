const express    = require("express");
const router     = express.Router();
const controller = require("../controllers/user.controller");
const { registerSchema, loginSchema } = require("../validations/user.validation.js");
const { validate } = require("../middleware/validate.js");

router.post("/register", validate(registerSchema), controller.register);
router.post("/login",    validate(loginSchema),    controller.login);
router.get("/",                                    controller.getUsers);

module.exports = router;