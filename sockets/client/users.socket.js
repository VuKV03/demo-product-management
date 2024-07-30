const User = require("../../models/user.model");

module.exports = (req, res) => {
  _io.once('connection', (socket) => {
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
  })
}