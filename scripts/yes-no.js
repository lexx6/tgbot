import { InputFile } from "grammy";

export default async (ctx) => {
    const randomNum = Math.round(Math.random())
    if (!!randomNum) {
        await ctx.replyWithPhoto(new InputFile("./Yes.png"));
    } else {
        await ctx.replyWithPhoto(new InputFile("./No.png"));
    }
}