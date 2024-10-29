import "dotenv/config";
import fs from "fs";
import { Bot } from "grammy";
import question from "./scripts/question.js";
import Calc from "./scripts/calc.js"
import YesNo from "./scripts/yes-no.js";
import Saver from "./scripts/saver.js"
import Hello from "./scripts/hello.js";
import RandomNum from "./scripts/randomNum.js";
import { WheatherTommorow, WheatherToday } from "./scripts/weather.js";

const bot = new Bot(process.env.TGTOKEN);

const init = () => {
    fs.mkdirSync('./temp', { recursive: true })

    // You can now register listeners on your bot object `bot`.
    // grammY will call the listeners when users send messages to your bot.

    bot.api.setMyCommands([
        { command: "start", description: "Запускает бот" },
    ]);

    bot.command("start", (ctx) => ctx.reply("Welcome! Up and running.")); // Команда /start.
    bot.hears(/=$/, Calc); // Считает математику.
    bot.hears(/\?$/, YesNo); // Генератор картинки да или нет.
    bot.hears(/^сохрани$/i, Saver); // Сохраняет файл.
    bot.hears(/^Привет$/i, question);
    // bot.hears(/^Привет$/i, Hello); // Здоровается.
    bot.hears(/^сгенерируй/i, RandomNum); // Генерирует случайное число.
    bot.hears(/^погода завтра$/, WheatherTommorow); // Прогноз погоды на завтра.
    bot.hears(/^погода сегодня$/, WheatherToday); // Прогноз погоды на сегодня.
    // Now that you specified how to handle messages, you can start your bot.
    // This will connect to the Telegram servers and wait for messages.
 
}

bot.start(); // Start the bot.
init();

