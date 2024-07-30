const User = require("../../models/user.model");

module.exports = (req, res) => {
  _io.once("connection", (socket) => {
    // Chức năng gửi yêu cầu
    // Khi A gửi yêu cầu cho B
    socket.on("CLIENT_ADD_FRIEND", async (userIdB) => {
      const myUserId = res.locals.user.id;

      // console.log(myUserId); // Id của A
      // console.log(userIdB);  // Id của B

      // Thêm id của A vào acceptFriends của B
      const existIdAinB = await User.findOne({
        _id: userIdB,
        acceptFriends: myUserId,
      });

      if (!existIdAinB) {
        await User.updateOne(
          {
            _id: userIdB,
          },
          {
            $push: { acceptFriends: myUserId },
          }
        );
      }

      // Thêm id của B vào requestFriends của A
      const existIdBinA = await User.findOne({
        _id: myUserId,
        requestFriends: userIdB,
      });

      if (!existIdBinA) {
        await User.updateOne(
          {
            _id: myUserId,
          },
          {
            $push: { requestFriends: userIdB },
          }
        );
      }
    });

    // Chức năng hủy yêu cầu
    socket.on("CLIENT_CANCEL_FRIEND", async (userIdB) => {
      const myUserId = res.locals.user.id;

      // console.log(myUserId); // Id của A
      // console.log(userIdB);  // Id của B

      // Xóa id của A trong acceptFriends của B
      const existIdAinB = await User.findOne({
        _id: userIdB,
        acceptFriends: myUserId,
      });

      if (existIdAinB) {
        await User.updateOne(
          {
            _id: userIdB,
          },
          {
            $pull: { acceptFriends: myUserId },
          }
        );
      }

      // Xóa id của B trong requestFriends của A
      const existIdBinA = await User.findOne({
        _id: myUserId,
        requestFriends: userIdB,
      });

      if (existIdBinA) {
        await User.updateOne(
          {
            _id: myUserId,
          },
          {
            $pull: { requestFriends: userIdB },
          }
        );
      }
    });
    // Hết Chức năng hủy yêu cầu

    // Chức năng từ chối kết bạn
    // Khi A từ chối kết bạn của B
    socket.on("CLIENT_REFUSE_FRIEND", async (userId) => {
      const myUserId = res.locals.user.id;

      // console.log(myUserId); // Id của B
      // console.log(userId);  // Id của A

      // Xóa id của A trong acceptFriends của B
      const existIdAinB = await User.findOne({
        _id: myUserId,
        acceptFriends: userId,
      });

      if (existIdAinB) {
        await User.updateOne(
          {
            _id: myUserId,
          },
          {
            $pull: { acceptFriends: userId },
          }
        );
      }

      // Xóa id của B trong requestFriends của A
      const existIdBinA = await User.findOne({
        _id: userId,
        requestFriends: myUserId,
      });

      if (existIdBinA) {
        await User.updateOne(
          {
            _id: userId,
          },
          {
            $pull: { requestFriends: myUserId },
          }
        );
      }
    });
    // Hết Chức năng từ chối kết bạn

    // Chức năng chấp nhận kết bạn
    // Khi A từ chối kết bạn của B
    socket.on("CLIENT_ACCEPT_FRIEND", async (userId) => {
      const myUserId = res.locals.user.id;

      // console.log(myUserId); // Id của B
      // console.log(userId);  // Id của A

      // Thêm {user_id, room_chat_id} của A vào friendsList của B
      // Xóa id của A trong acceptFriends của B
      const existIdAinB = await User.findOne({
        _id: myUserId,
        acceptFriends: userId,
      });

      if (existIdAinB) {
        await User.updateOne(
          {
            _id: myUserId,
          },
          {
            $push: {
              friendList: {
                user_id: userId,
                room_chat_id: "",
              },
            },
            $pull: { acceptFriends: userId },
          }
        );
      }

      // Thêm {user_id, room_chat_id} của B vào friendsList của A
      // Xóa id của B trong requestFriends của A
      const existIdBinA = await User.findOne({
        _id: userId,
        requestFriends: myUserId,
      });

      if (existIdBinA) {
        await User.updateOne(
          {
            _id: userId,
          },
          {
            $push: {
              friendList: {
                user_id: myUserId,
                room_chat_id: "",
              },
            },
            $pull: { requestFriends: myUserId },
          }
        );
      }
    });
    // Hết Chức năng chấp nhận kết bạn
  });
};
