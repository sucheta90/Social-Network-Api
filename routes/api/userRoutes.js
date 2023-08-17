const router = require("express").Router();
const {
  getAllusers,
  getSingleUser,
  createNewUser,
  updateUser,
  deleteUser,
} = require("../../controllers/userController");

// getAllusers finds and return all users and craeteNewUser 
router.route("/").get(getAllusers).post(createNewUser);

//getSingleUser
router.route('/:userId').get(getSingleUser).deleteUser()

module.exports = router;
