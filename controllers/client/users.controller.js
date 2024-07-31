const User = require("../../models/user.model");

const usersSocket = require("../../sockets/client/users.socket");

// [GET] /users/not-friend
module.exports.notFriend = async (req, res) => {
  // SocketIO
  usersSocket(req, res);
  // End SocketIO

  const userId = res.locals.user.id;

  const myUser = await User.findOne({
    _id: userId,
  });

  const requestFriends = myUser.requestFriends;
  const acceptFriends = myUser.acceptFriends;
  // const friendsList = res.locals.user.friendsList.map(user => user.user_id);

  const users = await User.find({
    $and: [
      {_id: {$ne: userId}},// not equal
      {_id: {$nin: requestFriends}}, // not in
      {_id: {$nin: acceptFriends}}, // not in
      // {_id: {$nin: friendsList}} // not in
    ],

    status: "active",
    deleted: false,
  }).select("avatar fullName");

  res.render("client/pages/users/not-friend", {
    pageTitle: "Danh sách người dùng",
    users: users,
  });
};

// [GET] /user/request
module.exports.request = async (req, res) => {
  // SocketIO
  usersSocket(req, res);
  // End SocketIO

  const userId = res.locals.user.id;

  const myUser = await User.findOne({
    _id: userId,
  });

  const requestFriends = myUser.requestFriends;
  const acceptFriends = myUser.acceptFriends;

  const users = await User.find({
    _id: { $in: requestFriends },
    status: "active",
    deleted: false,
  }).select("avatar fullName");
  
  res.render("client/pages/users/request", {
    pageTitle: "Lời mời đã gửi",
    users: users,
  });
};

// [GET] /user/accept
module.exports.accept = async (req, res) => {
  // SocketIO
  usersSocket(req, res);
  // End SocketIO

  const userId = res.locals.user.id;

  const myUser = await User.findOne({
    _id: userId,
  });

  const acceptFriends = myUser.acceptFriends;

  const users = await User.find({
    _id: { $in: acceptFriends },
    status: "active",
    deleted: false,
  }).select("avatar fullName");
  
  res.render("client/pages/users/accept", {
    pageTitle: "Lời mời đã nhận",
    users: users,
  });
};

// [GET] /user/friends
module.exports.friends = async (req, res) => {
  // SocketIO
  usersSocket(req, res);
  // End SocketIO

  const userId = res.locals.user.id;

  const myUser = await User.findOne({
    _id: userId,
  });

  const friendList = myUser.friendList;
  const friendListId = friendList.map(item => item.user_id);

  const users = await User.find({
    _id: { $in: friendListId },
    status: "active",
    deleted: false,
  }).select("id avatar fullName statusOnline");

  for(const user of users) {
    const infoFriend = friendList.find(friend => friend.user_id == user.id);
    user.infoFriend = infoFriend;
  }
  
  res.render("client/pages/users/friends", {
    pageTitle: "Danh sách bạn bè",
    users: users,
  });
};