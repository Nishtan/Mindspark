const { Router } = require("express");
const router = Router();

const studentControllers = require("../controllers/studentControllers");
const { reqStudentAuth ,checkStudent} = require("../middleware/authMiddleware");

router.get('/',checkStudent,studentControllers.profile);

router.get('/login', studentControllers.login_get);
router.post('/login', studentControllers.login_post);

router.get('/register', studentControllers.register_get);
router.post('/register', studentControllers.register_post);

module.exports = router;