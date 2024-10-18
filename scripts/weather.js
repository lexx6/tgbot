import axios from "axios";

export const WheatherTommorow = async (ctx) => {
    try {
        const resp = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHERTOKEN}&q=Moscow&days=2&aqi=no&alerts=no`)
        const {
            mintemp_c: minTemp,
            maxtemp_c: maxTemp,
            avghumidity: humidity, 
            maxwind_kph: wind,
            daily_will_it_rain,
            daily_chance_of_rain,
            daily_will_it_snow,
            daily_chance_of_snow,
        } = resp.data.forecast.forecastday[1].day;
        const windMS = parseFloat(wind / 3.6).toFixed(2);
        const {icon} = resp.data.forecast.forecastday[1].day.condition;

        const rainChance = Math.max(daily_will_it_rain, daily_chance_of_rain, daily_will_it_snow, daily_chance_of_snow)

        const caption = [
            `Погода завтра в Москве:`,
            `Температура: от ${minTemp}°С до ${maxTemp}°С`,
            `Влажность: ${humidity}%`,
            `Скорость ветра: ${windMS} м/с`,
            `Вероятность осадков: ${rainChance}%`,
        ].join('\n')

        await ctx.api.sendPhoto(ctx.chat.id, `https:${icon}`, {
            reply_parameters: { message_id: ctx.msg.message_id },
            caption,
        })

    } catch (e) {
        await ctx.reply('Сервис погоды недоступен')
    }
}

export const WheatherToday = async (ctx) => {
    try {
        const resp = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHERTOKEN}&q=Moscow&aqi=no`)
        const {
            temp_c: temp,
            humidity, 
            wind_kph: wind,
        } = resp.data.current;
        const windMS = parseFloat(wind / 3.6).toFixed(2);
        const {icon} = resp.data.current.condition;

        const caption = [
            `Погода сегодня в Москве:`,
            `Температура: ${temp}°С`,
            `Влажность: ${humidity}%`,
            `Скорость ветра: ${windMS} м/с`,
        ].join('\n')

        await ctx.api.sendPhoto(ctx.chat.id, `https:${icon}`, {
            reply_parameters: { message_id: ctx.msg.message_id },
            caption,
        })

    } catch (e) {
        console.log(e)
        await ctx.reply('Сервис погоды недоступен')
    }
}