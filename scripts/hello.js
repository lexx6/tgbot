export default async (ctx) => {
    await ctx.reply(`${ctx.update.message.from.first_name}, привет!`)
}