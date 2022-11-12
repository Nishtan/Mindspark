const { Router } = require("express");
const router = Router();
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const collegeControllers = require("../controllers/collegeControllers");
const { checkCollege } = require("../middleware/authMiddleware");

router.get('/labs', checkCollege, collegeControllers.labs_get);
router.get('/labs/new', checkCollege, collegeControllers.labs_new);
router.post('/labs', checkCollege, upload.array('images'), collegeControllers.labs_post);
router.get('/labs/:id',checkCollege,collegeControllers.bookings_get);

router.get('/', checkCollege, collegeControllers.profile);

router.get('/login', collegeControllers.login_get);
router.post('/login', collegeControllers.login_post);

router.get('/register', collegeControllers.register_get);
router.post('/register', collegeControllers.regsiter_post);

module.exports = router;
