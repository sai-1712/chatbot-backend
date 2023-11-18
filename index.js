const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const axios = require("axios");
const socket = require("socket.io");

//local imports
const connectDatabase = require("./config/database");
const openApiRoute = require("./routes/openAPIRoute");
const chatRoute = require("./routes/chatRoute");

//middlewares
app.use(cors());
app.use(express.json())
app.use("/", openApiRoute);
app.use("/chat", chatRoute);

//database connection
connectDatabase()

//socket connections and usage
const io = new socket.Server(server, {
  path: "/api/socket.io",
  cookie: false,
  cors: { credentials: true, origin: true },
});

const chatHistory = [];
io.on("connection", (socket) => {
  socket.on("sendMessage", async (data) => {
    console.log("===>> message from client: ", data.message);

    chatHistory.push({ role: "user", content: data.message });

    try {
      
      const chats = await axios.get("https://chatbot-backend-16w3.onrender.com/chat/getChat")
      let chatHistory = chats.data.allChats.map(({role, content}) => ({role, content}))
      
      chatHistory = [...chatHistory, { role: "user", content: data.message }]
      const response = await axios.post("https://chatbot-backend-16w3.onrender.com/getResponse", {
        messages: chatHistory, 
      })

      //post data to chat model

      const newchats = [
        {role: "user", content: data.message},
        response.data.message
      ]
      const updatedChats = await axios.post("https://chatbot-backend-16w3.onrender.com/chat/addChat", {
        newchats
      })
      
      const modifiedChats = updatedChats.data.allChats.map(({role, content}) => ({role, content}))
      console.log("m: \n", modifiedChats);
      socket.emit("receiveMessage", {
        chatlist: modifiedChats, 
      });
      chatHistory.push(response.data.message);

    } catch (error) {
      console.log(error.message);
    }
      
      
  });

  socket.on("disconnect", () => {
    console.log("===>>disconnect:");
  });
});


server.listen(5000, () => {
  console.log(":: server listening on 5000 :::");
});