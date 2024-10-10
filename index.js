import { Bot } from "grammy";

const bot = new Bot("7188438211:AAHPx0EHqN_UOHWZor8KG2N2Geb3fV979_I");

// You can now register listeners on your bot object `bot`.
// grammY will call the listeners when users send messages to your bot.

// Handle the /start command.
bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));

// Handle other messages.
bot.on("message", (ctx) => {
    const arr = ctx.message.text.split(' ')
    const result = arr.reduce((acc, operand, idx)=>{
        if (idx === 0 && idx % 2 > 0) return acc
        if (operand === '+') return acc + Number(arr[idx + 1])
        if (operand === '-') return acc - Number(arr[idx + 1])
        if (operand === '*') return acc * Number(arr[idx + 1])
        if (operand === '/') return acc / Number(arr[idx + 1])
        return acc
    }, Number(arr[0]))

    ctx.reply(`${result}`)
    // ctx.reply("Got another message!")
});

// Now that you specified how to handle messages, you can start your bot.
// This will connect to the Telegram servers and wait for messages.

// Start the bot.
bot.start();