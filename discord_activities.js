// Activity IDs
// Poker Night 755827207812677713 
// Chess In The Park 832012774040141894
// Checkers In The Park 832013003968348200
// Doodle Crew 878067389634314250
// Word Snacks 879863976006127627
// Letter League 879863686565621790
// Spell Cast 852509694341283871
// Watch Together 880218394199220334 
// Betrayal.io 773336526917861400 
// Fishington.io 814288819477020702 
// Awkword 879863881349087252 
// Ocho 832025144389533716
// Sketch Heads 902271654783242291

const fetch = require('node-fetch');
const game = tempVars('game');
const channel = tempVars('channel_id')

fetch(`https://discord.com/api/v8/channels/${channel}/invites`, {
 method: "POST",
 body: JSON.stringify({
  max_age: 86400,
  max_uses: 0,
  target_application_id: game,
  target_type: 2,
  temporary: false,
  validate: null
 }),
 headers: {
  "Authorization": `Bot ${client.token}`,
  "Content-Type": "application/json"
 }
})
.then(res => res.json())
.then(invite => {
 interaction.channel.send(`Invite to the game: https://discord.gg/${invite.code}`)
});
