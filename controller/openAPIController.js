const { Configuration, OpenAIApi } = require("openai");


const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

exports.responseFromOpenApi = async(req, res) =>{
    // console.log(req.body);
    const messages = req.body.messages;
    const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages,
    });

    res.json({
        message : chatCompletion.data.choices[0].message
    })
}