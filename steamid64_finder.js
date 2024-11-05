const fetch = require('node-fetch')

// const link = 'https://steamcommunity.com/id/KailHet/' || 'https://steamcommunity.com/profiles/76561198120696673'
// const api_key = "STEAM_API_KEY" 

async function steamid64_finder(link, api_key) {
    if (link.includes("/profiles/")) {
        const steamID64 = link.replace('https://steamcommunity.com/profiles/', '').replace('/','');
        return steamID64;
    } else if (link.includes("/id/")) {
        const customURL = link.replace('https://steamcommunity.com/id/', '').replace('/','')

        const url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${api_key}&vanityurl=${customURL}`
        const obj = await (await fetch(url)).json()

        const steamID64 = obj.response.steamid
        return steamID64;
    } else return console.log("Error searching user SteamID64");
}

exports.steamid64_finder = steamid64_finder
