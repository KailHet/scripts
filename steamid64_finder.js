const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js');

const link = 'https://steamcommunity.com/id/KailHet/'
const api_key = "STEAM_API_KEY" 

async function steamid64_finder() {
    if (link.includes("/profiles/")) {
        const customURL = link.toString().slice(36).replace('/','')
        Actions.storeValue(customURL, 1, "steamID64", cache)
    } else if (link.includes("/id/")) {
        const customURL = link.toString().slice(30).replace('/','')

        const url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${api_key}&vanityurl=${customURL}`
        const obj = await (await fetch(url)).json()

        const steamID64 = obj.response.steamid
        console.log('SteamID64 пользователя: ' + steamID64)
    } else return console.log("Произошла ошибка при поиске SteamID64");
}
load()
