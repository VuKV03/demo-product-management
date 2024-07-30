const User = require("../../models/user.model");

module.exports = (req, res) => {
  _io.once('connection', (socket) => {
    // Chức năng gửi yêu cầu
    // Khi A gửi yêu cầu cho B
    socket.on("CLIENT_ADD_FRIEND", async (userIdB) => {
      const myUserId = res.locals.user.id;

      // console.log(myUserId); // Id của A
      // console.log(userIdB);  // Id của B

      // Thêm id của A vào acceptFriends của B
      const existIdAinB = await User.findOne({
        _id: userIdB,
        acceptFriends: myUserId
      });

      if(!existIdAinB) {
        await User.updateOne({
          _id: userIdB,
        }, {
          $push: { acceptFriends: myUserId}
        })
      }


      // Thêm id của B vào requestFriends của A
      const existIdBinA = await User.findOne({
        _id: myUserId,
        requestFriends: userIdB
      });

      if(!existIdBinA) {
        await User.updateOne({
          _id: myUserId,
        }, {
          $push: { requestFriends: userIdB}
        })
      }

    })

    // Chức năng hủy yêu cầu
    socket.on("CLIENT_CANCEL_FRIEND", async (userIdB) => {
      const myUserId = res.locals.user.id;

      // console.log(myUserId); // Id của A
      // console.log(userIdB);  // Id của B

      // Xóa id của A trong acceptFriends của B
      const existIdAinB = await User.findOne({
        _id: userIdB,
        acceptFriends: myUserId
      });

      if(existIdAinB) {
        await User.updateOne({
          _id: userIdB,
        }, {
          $pull: { acceptFriends: myUserId}
        })
      }


      // Xóa id của B trong requestFriends của A
      const existIdBinA = await User.findOne({
        _id: myUserId,
        requestFriends: userIdB
      });

      if(existIdBinA) {
        await User.updateOne({
          _id: myUserId,
        }, {
          $pull: { requestFriends: userIdB}
        })
      }

    })
    // Hết Chức năng hủy yêu cầu

  })
}