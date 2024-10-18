export default async (ctx) => {
    const [from, to] = ctx.message
        .text?.split('')
        .filter(e => /[\d-]/.test(e))
        .join('')
        .split('-')
    if (from === undefined || to === undefined || from > to) {
        await ctx.reply(`Неправильный диапозон чисел`)
        return;
    }

    const randomNum = Math.round(Number(from) + (to - from) * Math.random())
    await ctx.reply(randomNum)
}