const Chat = require('../models/chatModel');

exports.addChat = async(req, res) => {
    try {
        const message = req.body.newchats;
        await Chat.insertMany(message);

        const allChats = await Chat.find({}).select('role content')

        res.json({allChats});
    } catch (error) {
        console.log(error.message);
    }
}

exports.getChats = async(req, res) => {
    const allChats = await Chat.find({}).select('role content')
    res.json({allChats});
}