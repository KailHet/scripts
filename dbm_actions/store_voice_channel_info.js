module.exports = {

  name: "Store Voice Channel Info",

  section: "Channel Control",

  subtitle(data, presets) {
    const info = [
      "Voice Channel Object",
      "Voice Channel ID",
      "Voice Channel Name",
      "Voice Channel Members",
      "Voice Channel Is Full?",
      "Voice Channel Position",
      "Voice Channel User Limit",
      "Voice Channel Bitrate",
      "Voice Channel Members Count",
      "Voice Channel Category ID",
    ];
    return `${presets.getVoiceChannelText(data.channel, data.varName)} - ${info[parseInt(data.info, 10)]}`;
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    const info = parseInt(data.info, 10);
    let dataType = "Unknown Type";
    switch (info) {
      case 0:
        dataType = "Voice Channel";
        break;
      case 1:
        dataType = "Voice Channel ID";
        break;
      case 2:
        dataType = "Text";
        break;
      case 3:
        dataType = "Members List";
        break;
      case 4:
        dataType = "Text";
        break;
      case 5:
      case 6:
      case 7:
      case 8:
        dataType = "Number";
        break;
      case 9:
        dataType = 'Category ID'
        break;
    }
    return [data.varName2, dataType];
  },

  meta: { version: "2.1.1", preciseCheck: true, author: null, authorUrl: null, downloadUrl: null },

  fields: ["channel", "varName", "info", "storage", "varName2"],

  html(isEvent, data) {
    return `
<voice-channel-input dropdownLabel="Source Channel" selectId="channel" variableContainerId="varNameContainer" variableInputId="varName" selectWidth="45%" variableInputWidth="50%"></voice-channel-input>
<br><br><br>
<div style="padding-top: 8px;">
	<span class="dbminputlabel">Source Info</span><br>
	<select id="info" class="round">
		<option value="0" selected>Voice Channel Object</option>
		<option value="1">Voice Channel ID</option>
		<option value="2">Voice Channel Name</option>
    <option value="3">Voice Channel Members</option>
    <option value="4">Voice Channel Is Full?</option>
		<option value="5">Voice Channel Position</option>
		<option value="6">Voice Channel User Limit</option>
		<option value="7">Voice Channel Bitrate</option>
		<option value="8">Voice Channel Members Count</option>
		<option value="9">Voice Channel Category ID</option>
	</select>
</div>
<br>
<store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName2"></store-in-variable>`;
  },

  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];
    const channel = parseInt(data.channel, 10);
    const varName = this.evalMessage(data.varName, cache);
    const info = parseInt(data.info, 10);
    const targetChannel = await this.getVoiceChannel(channel, varName, cache);
    if (!targetChannel) {
      this.callNextAction(cache);
      return;
    }
    let result;
    switch (info) {
      case 0:
        result = targetChannel;
        break;
      case 1:
        result = targetChannel.id;
        break;
      case 2:
        result = targetChannel.name;
        break;
      case 3:
        result = targetChannel.members;
        break;
      case 4:
        result = targetChannel.full;
        break;
      case 5:
        result = targetChannel.position;
        break;
      case 6:
        result = targetChannel.userLimit;
        break;
      case 7:
        result = targetChannel.bitrate;
        break;
      case 8:
        result = targetChannel.members.size;
        break;
      case 9:
        result = targetChannel.parentid;
        break;

      default:
        break;
    }
    if (result !== undefined) {
      const storage = parseInt(data.storage, 10);
      const varName2 = this.evalMessage(data.varName2, cache);
      this.storeValue(result, storage, varName2, cache);
    }
    this.callNextAction(cache);
  },

  mod() {},
};
