import "dotenv/config";
import fs from "fs";
import { Bot } from "grammy";
import Calc from "./scripts/calc.js"
import YesNo from "./scripts/yes-no.js";
import ImgSaver from "./scripts/imgSaver.js"
import Hello from "./scripts/hello.js";
import RandomNum from "./scripts/randomNum.js";
import { WheatherTommorow, WheatherToday } from "./scripts/weather.js";

const bot = new Bot(process.env.TGTOKEN);


fs.mkdirSync('./temp', { recursive: true })

const init = async () => {

    // You can now register listeners on your bot object `bot`.
    // grammY will call the listeners when users send messages to your bot.

    bot.api.setMyCommands([
        { command: "start", description: "Запускает бот" },
    ]);

    bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));     // Handle the /start command.
    bot.hears(/=$/, Calc); //считает математику
    bot.hears(/\?$/, YesNo) //генератор картинки да или нет
    bot.hears(/^сохрани$/i, ImgSaver) //Сохраняет файл
    bot.hears(/^Привет$/i, Hello) //Здоровается
    bot.hears(/^сгенерируй/i, RandomNum) //генерирует случайное число
    bot.hears(/^погода завтра$/, WheatherTommorow) //прогноз погоды на завтра
    bot.hears(/^погода сегодня$/, WheatherToday) //прогноз погоды на сегодня

    // Now that you specified how to handle messages, you can start your bot.
    // This will connect to the Telegram servers and wait for messages.

    // Start the bot.
}

bot.start();
init();

