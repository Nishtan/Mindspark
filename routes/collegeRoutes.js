const { Router } = require("express");
const router = Router();

const collegeControllers = require("../controllers/collegeControllers");
const { checkCollege } = require("../middleware/authMiddleware");

router.get('/', checkCollege, collegeControllers.profile);

router.get('/login', collegeControllers.login_get);
router.post('/login', collegeControllers.login_post);

router.get('/register', collegeControllers.register_get);
router.post('/register', collegeControllers.regsiter_post);

module.exports = router;
