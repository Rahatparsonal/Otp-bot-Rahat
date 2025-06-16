const TelegramBot = require('node-telegram-bot-api');
const { username, password, chatId, token } = require('./config');
const fetchOtp = require('./seven1tel');

const bot = new TelegramBot(token, { polling: true });

async function checkForOtp() {
    try {
        const otpData = await fetchOtp(username, password);
        if (otpData) {
            const message = `✨ OTP Received ✨\n\n🕰 Time: ${otpData.time}\n📞 Number: ${otpData.number}\n🛠 Service: ${otpData.service}\n🔐 OTP Code: ${otpData.code}\n📝 Msg: ${otpData.message}`;
            bot.sendMessage(chatId, message);
        }
    } catch (err) {
        console.error('Error fetching OTP:', err.message);
    }
}

setInterval(checkForOtp, 1000); // Check every 1 second