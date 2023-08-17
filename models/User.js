const { Schema, model } = require("mongoose");
const Thought = require("./Thought");
// User Schema
const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      // validate: {
      //     validator: function(v) {
      //       return /\d{3}-\d{3}-\d{4}/.test(v);
      //     },
      //     message: props => `${props.value} is not a valid phone number!`
      //   },
      //   required: [true, 'User phone number required']
      // }
      required: [true, "Please enter your email addess"],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "friend",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
// This is the virtual function to get the count of friends
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// User model intialized
const User = model("user", userSchema);

module.exports = User;
