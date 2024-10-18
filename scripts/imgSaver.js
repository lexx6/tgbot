import axios from "axios";
import fs from "fs";

export default async (ctx) => {

    try {
        const fileName = ctx.update.message.photo[2].file_unique_id
        const file = await ctx.api.getFile(ctx.update.message.photo[2].file_id)
        const filePath = file.file_path
        const url = `https://api.telegram.org/file/bot${process.env.TGTOKEN}/${filePath}`
        
        const saveTo = `./temp/${fileName}.jpg`
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

// создать папку temp при запуске. (если папка существует ингорируем этот шаг) !!!!

// сохранить файл с помощью потока (stream) в папку temp
// передать на yandex диск (с учетом отправителя фотки, если нужно - создать папку с именем отправителя на y.disk)
// удалить файл из папки temp
// сказать пользователю, что все ок

// билбиотека для yandex диска https://github.com/Kolyaj/yandex-disk
