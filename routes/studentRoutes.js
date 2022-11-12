const { Router } = require("express");
const router = Router();

const studentControllers = require("../controllers/studentControllers");
const { checkStudent } = require("../middleware/authMiddleware");

router.get('/', checkStudent, studentControllers.profile);
router.get('/labs', checkStudent, studentControllers.labs_get);
router.get('/bookings',checkStudent,studentControllers.bookings_get);

router.get('/labs/:id',checkStudent,studentControllers.slots_get);
router.post('/labs/:id/book',checkStudent,studentControllers.slots_book);

router.get('/login', studentControllers.login_get);
router.post('/login', studentControllers.login_post);

router.get('/register', studentControllers.register_get);
router.post('/register', studentControllers.register_post);

module.exports = router;