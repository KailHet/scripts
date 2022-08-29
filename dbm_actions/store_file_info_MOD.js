module.exports = {
  name: 'Store File Info',
  section: 'File Stuff',
  meta: {
    version: '2.1.5',
    preciseCheck: false,
    author: 'DBM Mods',
    authorUrl: 'https://github.com/dbm-network/mods',
    downloadURL: 'https://github.com/dbm-network/mods/blob/master/actions/store_file_info_MOD.js',
  },

  subtitle(data) {
    const info = [
      "Размер (байт)",
      "Размер (КБайт)",
      "Размер (МБайт)",
      "Расширение",
      "Кол-во символов",
      "Дата создания ",
      "Дата последнего редактирования",
      "Дата создания (unix timestamp)",
      "Дата последнего редактирования (unix timestamp)",
      "Существует?",
      "Содержание",
      "Имя",
    ];
    return `Информация о файле (${data.filePath}) - ${info[parseInt(data.info, 10)]}`;
  },

  fields: ['filePath', 'info', 'storage', 'varName'],

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    const info = parseInt(data.info, 10);
    let dataType = "Unknown Type";
    switch (info) {
      case 0:
      case 1:
      case 2:
        dataType = 'Number';
        break;
      case 3:
        dataType = 'String';
        break;
      case 4:
        dataType = 'Number';
        break;
      case 5:
      case 6:
        dataType = 'Timestamp';
        break;
      case 7:
      case 8:
        dataType = 'Unix Timestamp';
        break;
      case 9:
        dataType = 'Boolean';
        break;
      case 10:
      case 11:
        dataType = 'String';
        break;
    }
    return [data.varName, dataType];
  },

  html(_isEvent, data) {
    return `
  <div style="padding-left: 0px;">
    <span class="dbminputlabel">Путь к файлу (пример: <strong>./bot.js</strong>)</span><br>
    <input class='round' id='filePath' /><br>
    <span class="dbminputlabel">Информация</span><br>
    <select class='round' id='info'>
      <option value="0" selected>Размер (байт)</option>
      <option value="1" selected>Размер (КБайт)</option>
      <option value="2" selected>Размер (МБайт)</option>
      <option value="3">Расширение</option>
      <option value="4">Кол-во символов</option>
      <option value="5">Дата создания</option>
      <option value="6">Дата последнего редактирования</option> 
      <option value="7">Дата создания (unix timestamp)</option>
      <option value="8">Дата последнего редактирования (unix timestamp)</option>     
      <option value="9">Существует?</option>
      <option value="10">Содержание</option>
      <option value="11">Имя</option>
    </select><br>
    <span class="dbminputlabel">Сохранить в</span><br>
    <select class='round' id='storage'>
      ${data.variables[1]}
    </select><br>
    <span class="dbminputlabel">Название переменной</span><br>
    <input class='round' id='varName' />
  </div>`;
  },

  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];
    const storage = parseInt(data.storage, 10);
    const info = parseInt(data.info, 10);
    const path = require('path');
    const fs = require('fs');
    const varName = this.evalMessage(data.varName, cache);
    const filePath = this.evalMessage(data.filePath, cache);

    if (!filePath) return this.displayError('Insert a file path!');

    let result;
    switch (info) {
      case 0: // Размер (байт)
        result = fs.statSync(filePath).size;
        break;
      case 1: // Размер (КБайт)
        result = Math.floor(fs.statSync(filePath).size /1024);
        break;
      case 2: // Размер (МБайт)
        result = Math.floor(fs.statSync(filePath).size / 1024 /1024);
        break;
      case 3: // Расширение
        result = path.extname(/[^/]*$/.exec(filePath)[0]);
        break;
      case 4: // Кол-во символов
        result = fs.readFileSync(filePath).toString().length;
        break;
      case 5: // Дата создания
        result = fs.statSync(filePath).birthtime;
        break;
      case 6: // Дата последнего изменения
        result = fs.statSync(filePath).mtime;
        break;
      case 7: // Дата создания (unix timestamp)
        result = Math.floor(fs.statSync(filePath).birthtime / 1000);
        break;
      case 8: // Дата последнего изменения (unix timestamp)
        result = Math.floor(fs.statSync(filePath).mtime / 1000);
        break;
      case 9: // Существует?
        result = fs.existsSync(filePath);
        break;
      case 10: // Содержание
        result = fs.readFileSync(filePath).toString();
        break;
      case 11: // Имя
        result = path.basename(filePath);
        break;
    }
    this.storeValue(result, storage, varName, cache);
    this.callNextAction(cache);
  },

  mod() {},
};
