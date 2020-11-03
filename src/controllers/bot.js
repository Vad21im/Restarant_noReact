let TelegramBot = require('node-telegram-bot-api');
const Chat = require('../models/chat.model');




const bot = async () => {
    let token = '1382681542:AAHJ-BIH-tau5N2ErWuVnxnf0jH5EViJCSY';
    let bot = new TelegramBot(token, {polling: true});

    let notes = [];

    bot.onText(/(.+)/, async (msg, match) => {
        let userId = msg.from.id;
        let text = match[1];
        let time = match[2];

        notes.push({ 'uid': userId, 'time': time, 'text': text });

        if (msg.reply_to_message) {
            const chat = await Chat.find();
            text = 'Admin: '+text;
            const adminMsg = await new Chat({
                id: chat.length,
                text: text
            }).save();
            const result = [msg.reply_to_message.message_id, text];
        }
    });
}
module.exports = bot;
