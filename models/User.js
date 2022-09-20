const mongoose = require("mongoose");
// const AutoIncrement = require("mongoose-sequence")(mongoose);
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// userSchema.plugin(AutoIncrement, {
//   inc_field: "user",
//   id: "userNums",
//   start_seq: 500,
// });

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
