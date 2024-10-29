import axios from "axios";
import fs from "fs";
import { YandexDisk } from "yandex-disk";
import yaDiskStream from 'ya-disk-stream';
const uploadStream = yaDiskStream.upload

const disk = new YandexDisk(process.env.YANDEXDISK)

export default async (ctx) => {
    const msg = ctx.update.message;
    const isVideo = msg.hasOwnProperty('video')
    const saveDirName = isVideo ? 'Videos' : 'Photos'
    const {file_id: fileId , file_unique_id: fileUniqueId} = isVideo ? msg.video : msg.photo[2]
    const userName = msg.from.username
    const file = await ctx.api.getFile(fileId)
    const filePath = file.file_path
    const extension = file.file_path.split('.').pop()
    const url = `https://api.telegram.org/file/bot${process.env.TGTOKEN}/${filePath}`

    try {
        const { data } = await axios.get(url, { responseType: "stream" })
        disk.mkdir(`/GarryTGBotFiles/${saveDirName}/${userName}`, async (err) => {
            if (!err) {
                await uploadStream(
                    process.env.YANDEXDISK,
                    `disk:/GarryTGBotFiles/${saveDirName}/${userName}/${fileUniqueId}.${extension}`,
                    true,
                    (stream) => {
                        ctx.reply('Сохраняю')
                        return data.pipe(stream)
                    },
                    (err) => {
                        ctx.reply('Ошибка сохранения файла')
                        process.stderr.write(err)
                    }
                );
            } else {
                process.stderr.write(err)
                ctx.reply('Ошибка создании папки')
            }
        })
    } catch (e) {
        console.error(e)
        await ctx.reply('Ошибка сохранения файла')
    }
}