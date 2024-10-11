import { Bot, InputFile } from "grammy";

const bot = new Bot("7188438211:AAHPx0EHqN_UOHWZor8KG2N2Geb3fV979_I");

const init = async () => {

    // You can now register listeners on your bot object `bot`.
    // grammY will call the listeners when users send messages to your bot.

    bot.api.setMyCommands([
        { command: "start", description: "Запускает бот" },
    ]);

    // Handle the /start command.
    bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));


    // Handle other messages.
    bot.hears(/=$/, async (ctx) => {
        const allowed = ['+', '-', '*', '/', '(', ')', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        const msg = ctx.message.text?.split('').filter((el) => allowed.includes(el)).join('')
        try {
            const result = eval(msg)
            await ctx.reply(`${result}`)
        } catch {
            await ctx.reply(`Неправильное выражение`)
        }
    });

    bot.hears(/\?$/, async (ctx) => {
        const randomNum = Math.round(Math.random())
        if (!!randomNum) {
            await ctx.replyWithPhoto(new InputFile("./Yes.png"));
        } else {
            await ctx.replyWithPhoto(new InputFile("./No.png"));
        }
    })

    // Now that you specified how to handle messages, you can start your bot.
    // This will connect to the Telegram servers and wait for messages.

    // Start the bot.
}

bot.start();
init();

