const { User, Thought } = require("../models");

module.exports = {
  getAllusers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((user) =>
        !user
          ? res.json(400).json(`No user found with that Id`)
          : res.status(200).json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  createNewUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req, res) {
    let filter = req.params.userId;
    let update = req.body;
    User.findOneAndUpdate({ _id: filter }, update)
      .then((user) =>
        !user ? res.status(400).json("Could not update!") : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(400).json({ message: "No user fouund with that id" })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() =>
        res.json({ message: "User and associated thoughts are deleted" })
      );
  },
};
