const Chat = require("../../models/chat.model");
const uploadToCloudinary = require("../../helpers/uploadToCloudinary.helper");

module.exports = async (res) => {
  const userId = res.locals.user.id;
  const fullName = res.locals.user.fullName;

  _io.once("connection", (socket) => {
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
        content: data.content,
        images: images
      });
      await chat.save();

      // Trả data về client
      _io.emit("SERVER_RETURN_MESSAGE", {
        userId: userId,
        fullName: fullName,
        content: data.content,
        images: images
      });
    });

    socket.on("CLIENT_SEND_TYPING", (type) => {
      socket.broadcast.emit("SERVER_RETURN_TYPING", {
        userId: userId,
        fullName: fullName,
        type: type,
      });
    });
  });
}