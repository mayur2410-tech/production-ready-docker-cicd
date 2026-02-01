const express = require("express");
const authMiddleware =  require('../../../middleware/authMiddleware');
const {getUserProfile,updateUserProfile} = require('../../../controllers/user/Profile-Management/profileController')
const {updatePassword} = require('../../../controllers/user/Authentification/userController')
const router = express.Router();

router.get('/profile',authMiddleware,getUserProfile);
router.patch('/profile',authMiddleware,updateUserProfile);
router.put('/update-password',authMiddleware,updatePassword)

module.exports = router