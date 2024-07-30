const mongoose = require("mongoose");
const generate = require("../helpers/generate");

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    tokenUser: {
      type: String,
      default: generate.generateRandomString(30),
    },
    phone: String,
    avatar: String,
    friendList: [ //Danh sách bạn bè
      {
        user_id: String,
        room_chat_id: String
      }
    ],
    acceptFriends: Array, // Lời mời dã nhận
    requestFriends: Array, // Lời mời đã gửi
    status: {
      type: String,
      default: "active"
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
