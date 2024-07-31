const Chat = require("../../models/chat.model");
const uploadToCloudinary = require("../../helpers/uploadToCloudinary.helper");

module.exports = async (req, res) => {
  const userId = res.locals.user.id;
  const fullName = res.locals.user.fullName;

  const roomChatId = req.params.roomChatId;

  _io.once("connection", (socket) => {
    socket.join(roomChatId);
    socket.on("CLIENT_SEND_MESSAGE", async (data) => {
      const images = [];


      if(data.images.length > 0) {
        for (const imageBuffer of data.images) {
          const linkImage = await uploadToCloudinary(imageBuffer);
          images.push(linkImage);
        }
      }

      // TEST
      // console.log(data.images);
      // const chat = new Chat({
      //   user_id: userId,
      //   content: data.content,
      //   images: data.images
      // });
      // await chat.save();

      // _io.emit("SERVER_RETURN_MESSAGE", {
      //   userId: userId,
      //   fullName: fullName,
      //   content: data.content,
      //   images: data.images
      // });

      // TEST

      // Lưu vào db
      const chat = new Chat({
        user_id: userId,
        room_chat_id: roomChatId,
        content: data.content,
        images: images
      });
      await chat.save();

      // Trả data về client
      _io.to(roomChatId).emit("SERVER_RETURN_MESSAGE", {
        userId: userId,
        fullName: fullName,
        content: data.content,
        images: images
      });
    });

    socket.on("CLIENT_SEND_TYPING", (type) => {
      socket.broadcast.to(roomChatId).emit("SERVER_RETURN_TYPING", {
        userId: userId,
        fullName: fullName,
        type: type,
      });
    });
  });
}