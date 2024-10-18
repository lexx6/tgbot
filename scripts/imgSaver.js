import axios from "axios";
import fs from "fs";

export default async (ctx) => {
    try {
        const fileName = ctx.update.message.photo[2].file_unique_id
        const file = await ctx.api.getFile(ctx.update.message.photo[2].file_id)
        const filePath = file.file_path
        const url = `https://api.telegram.org/file/bot7188438211:AAHPx0EHqN_UOHWZor8KG2N2Geb3fV979_I/${filePath}`
        
        const saveTo = `C:\\Users\\lexx6\\BotFiles\\${fileName}.jpg`
        const fileStream = fs.createWriteStream(saveTo);

        fileStream.on('finish', async () => {
            fileStream.close();
            await ctx.reply(`${ctx.update.message.from.first_name}, ваш файл успешно сохранен`)
        });

        const { data } = await axios.get(url, { responseType: "stream" })
        data.pipe(fileStream);
    } catch (e) {
        console.error(e)
        await ctx.reply('Ошибка при сохранении фотографии')
    }
}