module.exports = {
  name: 'Run Script Too',
  section: 'Other Stuff',
  meta: {
    version: '2.1.5',
    preciseCheck: false,
    author: 'DBM Mods',
    authorUrl: 'https://github.com/dbm-network/mods',
    downloadURL: 'https://github.com/dbm-network/mods/blob/master/actions/run_script_too_MOD.js',
  },

  subtitle(data) {
    if (data.title) return `${data.title}`;
    return `${data.file ? `Сторонний файл: ${data.file}` : data.code}`;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName, 'Unknown Type'];
  },

  fields: ['behavior', 'interpretation', 'code', 'file', 'title'],

  html(_isEvent, data) {
    return `
<div id ="wrexdiv" style="width: 550px; height: 420px; overflow-y: scroll;">
  <div>
    <div style="float: left; width: 45%;padding-top: 3px;">
    <span class="dbminputlabel">Что делать в конце?</span><br>
      <select id="behavior" class="round">
        <option value="0"selected>Продолжить действия</option>
        <option value="1">Не продолжать действия</option>
      </select>
    </div>
    <div style="padding-left: 2%; float: left; width: 53%; padding-top: 3px;">
    <span class="dbminputlabel">Стиль интерпретации</span><br>
      <select id="interpretation" class="round">
        <option value="0">Сначала анализ кода</option>
        <option value="1" selected>Анализ кода постепенно</option>
      </select>
    </div>
  </div><br><br><br>
  <div id="" style="float: left; width: 98%;padding-top: 3px;">
  <span class="dbminputlabel">Название скрипта (показано в списке действий)</span><br>
    <input id="title" class="round" type="text">
  </div><br><br><br>
  <div>
  <span class="dbminputlabel">Путь к скрипту (необязательно)</span><br>
    <div style="float: left; width: 98%;">
      <input type="text" name="file" id="file" class="round" placeholder="./scripts/myscript.js" style="float: left;"/>
    </div>
  </div><br><br>
  <div style="padding-top: 8px;">
    <span class="dbminputlabel">Поле для кода (не используется, если указан путь к скрипту)</span><br>
    <textarea id="code" rows="14" name="is-eval" style="width: 98%; white-space: nowrap; resize: none;"></textarea>
  </div><br><br>
</div>
<style>
  /* Embed CSS code */
  .embed {
    position: relative;
  }

  .embedinfo {
    background: rgba(46,48,54,.45) fixed;
    border: 1px solid hsla(0,0%,80%,.3);
    padding: 10px;
    margin:0 4px 0 7px;
    border-radius: 0 3px 3px 0;
  }

  embedleftline {
    background-color: #eee;
    width: 4px;
    border-radius: 3px 0 0 3px;
    border: 0;
    height: 100%;
    margin-left: 4px;
    position: absolute;
  }

  span.embed-auth {
    color: rgb(255, 255, 255);
  }

  span.embed-desc {
    color: rgb(128, 128, 128);
  }

  span.wrexlink {
    color: #99b3ff;
    text-decoration:underline;
    cursor:pointer;
  }

  span.wrexlink:hover {
    color:#4676b9;
  }
</style>`;
  },

  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];
    const { file } = data;

    let code;

    const fs = require('fs');
    if (file && fs.existsSync(file)) {
      try {
        code = fs.readFileSync(file, 'utf8');
      } catch (error) {
        console.error(error.stack ? error.stack : error);
      }
    } else if (data.interpretation === '0') {
      code = this.evalMessage(data.code, cache);
    } else {
      code = data.code;
    }

    if (data.behavior === '0') this.callNextAction(cache);
  },

  mod() {},
};
