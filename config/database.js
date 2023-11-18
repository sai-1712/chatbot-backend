const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect('mongodb+srv://raviralasai1712:FB0z12xTSaizlYGg@cluster0.go8e5tf.mongodb.net/chatapp?retryWrites=true&w=majority', {
    })
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    });
};

module.exports = connectDatabase;