import { Keyboard } from "grammy";




export default async (ctx) => {
    
    const moodKeyboard = new Keyboard()
        .text('Хорошо')
        .row()
        .text('Нормально')
        .row()
        .text('Плохо')
        .resized()
            .oneTime();

    await ctx.reply('Привет, как дела?' , {
        reply_markup: moodKeyboard,
    });
}