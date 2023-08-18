const router = require("express").Router();
const {
  createThought,
  getAllThoughts,
  getThoughtById,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// /api/thoughts

// get all thoughts
router.route("/").get(getAllThoughts);

//  create a thought and add the thought id to the user data
router.route("/").post(createThought);

//get a thought by id | delete thought | update a thought
router
  .route("/:thoughtId")
  .get(getThoughtById)
  .delete(deleteThought)
  .put(updateThought);

//add reaction
router.route("/:thoughtId/reactions/").post(addReaction);

// remove reaction
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
