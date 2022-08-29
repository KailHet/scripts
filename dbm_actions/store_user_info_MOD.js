module.exports = {
  name: 'Store User Info',
  section: 'User Control',
  meta: {
    version: '2.0.11',
    preciseCheck: false,
    author: 'DBM Mods',
    authorUrl: 'https://github.com/dbm-network/mods',
    downloadURL: 'https://github.com/dbm-network/mods/blob/master/actions/store_user_info_MOD.js',
  },

  subtitle(data) {
    const users = ['Mentioned User', 'Command Author', 'Temp Variable', 'Server Variable', 'Global Variable'];
    const info = [
      'Объект',
      'ID',
      'Никнейм',
      'Дискриминатор',
      'Тэг',
      'Ссылка на аватар',
      'Бот?',
      'Дата создания',
      'Дата создания (Unix Timestamp)',
    ];
    return `${users[parseInt(data.user, 10)]} - ${info[parseInt(data.info, 10)]}`;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    let dataType = 'Unknown Type';
    switch (parseInt(data.info, 10)) {
      case 0:
        dataType = 'User';
        break;
      case 1:
        dataType = 'User ID';
        break;
      case 2:
      case 3:
      case 4:
      case 7:
        dataType = 'Text';
        break;
      case 5:
        dataType = 'Image URL';
        break;
      case 6:
        dataType = 'Boolean';
        break;

      case 8:
        dataType = 'Unix Timestamp';
        break;
      default:
        break;
    }
    return [data.varName2, dataType];
  },

  fields: ['user', 'varName', 'info', 'storage', 'varName2'],

  html(isEvent, data) {
    return `
  <div>
    <div style="float: left; width: 35%">
    <span class="dbminputlabel">Пользователь</span><br>
      <select id="user" class="round" onchange="glob.memberChange(this, 'varNameContainer')">
        ${data.members[isEvent ? 1 : 0]}
      </select>
    </div>
    <div id="varNameContainer" style="display: none; float: right; width: 60%">
    <span class="dbminputlabel">Название переменной</span><br>
      <input id="varName" class="round" type="text" list="variableList"><br>
    </div>
  </div><br><br><br>
  <div>
    <div style="padding-top: 8px; width: 70%">
    <span class="dbminputlabel">Информация</span><br>
      <select id="info" class="round">
        <option value="0" selected>Объект пользователя</option>
        <option value="1">ID пользователя</option>
        <option value="2">Имя пользователя</option>
        <option value="3">Дискриминатор</option>
        <option value="4">Тэг пользователя</option>
        <option value="5">Ссылка на аватар</option>
        <option value="6">Пользователь бот?</option>
        <option value="7">Дата создания аккаунта</option>
        <option value="8">Дата создания аккаунта (Unix Timestamp)</option>
      </select>
    </div>
  </div><br>
  <div>
    <div style="float: left; width: 35%">
    <span class="dbminputlabel">Сохранить в</span><br>
      <select id="storage" class="round">
        ${data.variables[1]}
      </select>
    </div>
    <div id="varNameContainer2" style="float: right; width: 60%">
      <span class="dbminputlabel">Название переменной</span><br>
      <input id="varName2" class="round" type="text"><br>
    </div>
  </div>`;
  },

  init() {
    const { glob, document } = this;

    glob.memberChange(document.getElementById('user'), 'varNameContainer');
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const userType = parseInt(data.user, 10);
    const varName = this.evalMessage(data.varName, cache);
    const info = parseInt(data.info, 10);
    let user = await this.getMember(userType, varName, cache);
    if (!user) return this.callNextAction(cache);
    if (user.user) user = user.user;

    let result;
    switch (info) {
      case 0: // User Object
        result = user;
        break;
      case 1: // User ID
        result = user.id;
        break;
      case 2: // Username
        result = user.username;
        break;
      case 3: // User Discriminator
        result = user.discriminator;
        break;
      case 4: // User Tag
        result = user.tag;
        break;
      case 5: // User Avatar
        result = user.displayAvatarURL({
          dynamic: true,
          format: 'png',
          size: 4096,
        });
        break;
      case 6:
        result = user.bot;
        break;
      case 7: // User Created At
        result = user.createdAt;
        break;
      case 8: // User Created Timestamp
        result = user.createdTimestamp;
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
