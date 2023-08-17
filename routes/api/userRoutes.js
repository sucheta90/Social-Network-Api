const router = require("express").Router();
const {
  getAllusers,
  getSingleUser,
  createNewUser,
  updateUser,
  addFriend,
  removeFriend,
  deleteUser,
} = require("../../controllers/userController");

// getAllusers finds and return all users and craeteNewUser
router.route("/").get(getAllusers).post(createNewUser);

//getSingleUser
router.route("/:userId").get(getSingleUser).delete(deleteUser).put(updateUser);

//addFriend
router.route("/:userId/friends/:friendId").post(addFriend);

// removeFriend
router.route("/:userId/friends/:friendId").delete(removeFriend);

module.exports = router;
