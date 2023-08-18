const { User, Thought, Reaction } = require("../models");
const { ObjectId } = require("mongoose");

// /api/thoughts

module.exports = {
  // creates thought and adds id to the user model
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      if (!thought) {
        return res
          .status(404)
          .json({ message: "Request couldn't be completed at this time" });
      } else {
        const user = await User.findOneAndUpdate(
          { username: req.body.username },
          {
            $addToSet: { thoughts: thought._id },
          },
          { new: true }
        );
        if (!user) {
          throw new Error();
        }
        res.json(thought);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  //   get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //   Get thought by id
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");
      if (!thought) {
        return res
          .status(404)
          .json({ message: "Couldn't find a thought by that ID" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //   Update thought
  async updateThought(req, res) {
    try {
      let filter = req.params.thoughtId;
      let update = req.body;
      const thought = await Thought.findOneAndUpdate(
        { _id: filter },
        update
      ).select("-__v");
      if (!thought) {
        return res
          .status(404)
          .json({ message: "Couldn't find a thought by that ID" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //   Delete thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      console.log(thought);
      if (!thought) {
        return res.status(400).json({ message: "No thought found by that id" });
      }
      res.status(200).json({ message: "Thought deleted successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //   /api/thoughts/:thoughtId/reactions
  //   add reaction
  async addReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        { _id: req.params.thoughtId },
        {
          $addToSet: { reactions: req.body },
        },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that id" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete Reaction
  async deleteReaction(req, res) {
    try {
      console.log("Deleting reaction...");
      console.log("Thought ID:", req.params.thoughtId);
      console.log("Reaction ID:", req.params.reactionId);
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID :(" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
