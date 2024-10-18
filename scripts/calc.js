export default async (ctx) => {  
    const allowed = ['+', '-', '*', '/', '(', ')', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    const msg = ctx.message.text?.split('').filter((el) => allowed.includes(el)).join('')
    try {
        const result = eval(msg)
        await ctx.reply(`${result}`)
    } catch {
        await ctx.reply(`Неправильное выражение`)
    }
}