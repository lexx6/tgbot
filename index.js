import { Bot } from "grammy";

const bot = new Bot("7188438211:AAHPx0EHqN_UOHWZor8KG2N2Geb3fV979_I");

// You can now register listeners on your bot object `bot`.
// grammY will call the listeners when users send messages to your bot.

// Handle the /start command.
bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));

// Handle other messages.
bot.on("message", (ctx) => {
    if (ctx.message.from.id !== 934288492) {
        ctx.reply(`Доступ запрещен`)
        return;
    }
    // if (ctx.chat.id !== 934288492) ctx.reply(`Доступ запрещен`)
    const allowed = ['+', '-', '*', '/', '(', ')', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    const msg = ctx.message.text.split('').filter((el) => allowed.includes(el)).join('')
    try {
        const result = eval(msg)
        ctx.reply(`${result}`)
    } catch {
        ctx.reply(`Неправильное выражение`)
    }
});

// Now that you specified how to handle messages, you can start your bot.
// This will connect to the Telegram servers and wait for messages.

// Start the bot.
bot.start();

