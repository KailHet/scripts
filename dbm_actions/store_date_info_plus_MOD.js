module.exports = {
  name: 'Store Date Info Plus',
  section: 'Other Stuff',
  meta: {
    version: '2.1.6',
    preciseCheck: false,
    author: 'DBM Mods',
    authorUrl: 'https://github.com/dbm-network/mods',
    downloadURL: 'https://github.com/dbm-network/mods/blob/master/actions/store_date_info_plus_MOD.js',
  },

  subtitle(data) {
    const info = [
      'Day of Week',
      'Day Number',
      'Day of Year',
      'Week of Year',
      'Month of Year',
      'Month Number',
      'Year',
      'Hour',
      'Minute',
      'Second',
      'Millisecond',
      'Timezone',
      'Unix Timestamp',
    ];
    // const storage = ['', 'Temp Variable', 'Server Variable', 'Global Variable'];
    return `Store ${
      data.modeStorage === '0' ? `"${info[data.info]}"` : data.buildInput === '' ? '"Not Set"' : `"${data.buildInput}"`
    } from a Date`;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName, 'Date'];
  },

  fields: ['sourceDate', 'dateType', 'modeStorage', 'info', 'buildInput', 'storage', 'varName'],

  html(_isEvent, data) {
    return `
  <div style="float: left; width: 38%">
    <span class="dbminputlabel">Дата</span><br>
      <select id="dateType" class="round" onchange="glob.onChangeDate(this)">
        <option value="0">Текущая</option>
        <option value="1" selected>Другая</option>
      </select>
  </div>
  <div id="customDate" style="float: left; width: 62%; padding-left: 3%">
    <span class="dbminputlabel">Другая дата</span><br>
      <input id="sourceDate" class="round" type="text" placeholder="Sun Oct 26 2019 10:38:01 GMT+0200">
  </div><br><br><br>
  <div style="float: left; width: 45%; padding-top: 16px">
    <span class="dbminputlabel">Режим</span><br>
      <select id="modeStorage" class="round" onchange="glob.onChangeMode(this)">
        <option value="0" selected>На выбор</option>
        <option value="1">Построение</option>
      </select>
  </div>
  <div id="selectMode" style="display: none; float: left;padding-left: 3%; width: 55%; padding-top: 16px">
    <span class="dbminputlabel">Информация на выбор</span><br>
      <select id="info" class="round">
        <option value="0" selected>День недели</option>
        <option value="1">День (число)</option>
        <option value="2">День года (число)</option>
        <option value="3">Неделя года (число)</option>
        <option value="4">Месяц</option>
        <option value="5">Месяц (число)</option>
        <option value="6">Год</option>
        <option value="7">Час</option>
        <option value="8">Минуты</option>
        <option value="9">Секунды</option>
        <option value="10">Миллисекунды</option>
        <option value="11">Часовой пояс</option>
        <option value="12">Unix Timestamp</option>
      </select>
  </div>
  <div id="buildMode" style="display: none; float: left; width: 55%; padding-left: 3%; padding-top: 16px">
    <span class="dbminputlabel">Построение даты (<a href="https://momentjs.com/docs/#/displaying/format/">Moment Docs</a>)</span><br>
      <input id="buildInput" class="round" placeholder="DD/MM/YYYY = 10/26/2019">
  </div><br><br><br><br><br>
  <div style="float: left; width: 45%;">
    <span class="dbminputlabel">Сохранить в</span><br>
      <select id="storage" class="round">
        ${data.variables[1].replace(`Temp Variable`, `Временная переменная`).replace(`Server Variable`, `Серверная переменная`).replace(`Global Variable`, `Глобальная переменная`)}
      </select>
  </div>
  <div id="varNameContainer" style="float: left;padding-left: 3%; width: 55%;">
    <span class="dbminputlabel">Название переменной</span><br>
      <input id="varName" class="round" type="text">
  </div><br><br><br>
  <div id="noteContainer" style="display: none; padding-top: 16px">
    <b>Примечание: </b>Вы можете использовать квадратные скобки, чтобы вставить в дату свой текст в режиме Построения<br>
    <b>Пример:</b> <span id="code">DD/MM/YYYY [в] HH:mm</span> = <span id="code">10/26/2019 в 10:38</span>
  </div>
<style>
  #code {
    background: #2C313C;
    color: white;
    padding: 3px;
    font-size: 12px;
    border-radius: 2px
  }
</style>`;
  },

  init() {
    const { glob, document } = this;

    glob.onChangeMode = function onChangeMode(modeStorage) {
      switch (parseInt(modeStorage.value, 10)) {
        case 0:
          document.getElementById('selectMode').style.display = null;
          document.getElementById('buildMode').style.display = 'none';
          document.getElementById('noteContainer').style.display = 'none';
          break;
        case 1:
          document.getElementById('selectMode').style.display = 'none';
          document.getElementById('buildMode').style.display = null;
          document.getElementById('noteContainer').style.display = null;
          break;
      }
    };

    glob.onChangeDate = function onChangeDate(dateType) {
      switch (parseInt(dateType.value, 10)) {
        case 0:
          document.getElementById('customDate').style.display = 'none';
          break;
        case 1:
          document.getElementById('customDate').style.display = null;
          break;
      }
    };

    glob.onChangeDate(document.getElementById('dateType'));
    glob.onChangeMode(document.getElementById('modeStorage'));
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const moment = this.getMods().require('moment');
    let date;
    const buildInput = this.evalMessage(data.buildInput, cache);
    const modeType = parseInt(this.evalMessage(data.modeStorage, cache), 10);
    const info = parseInt(data.info, 10);
    const dateType = parseInt(data.dateType, 10)

    switch (dateType) {
      case 0:
        date = moment()
        break;
      case 1:
        date = moment(Date.parse(this.evalMessage(data.sourceDate, cache)));
        break;
    }

    let result;

    if (modeType === 0) {
      switch (info) {
        case 0:
          result = date.format('dddd');
          break;
        case 1:
          result = date.format('DD');
          break;
        case 2:
          result = date.format('DDD');
          break;
        case 3:
          result = date.format('ww');
          break;
        case 4:
          result = date.format('MMMMM');
          break;
        case 5:
          result = date.format('MM');
          break;
        case 6:
          result = date.format('YYYY');
          break;
        case 7:
          result = date.format('hh');
          break;
        case 8:
          result = date.format('mm');
          break;
        case 9:
          result = date.format('ss');
          break;
        case 10:
          result = date.format('SS');
          break;
        case 11:
          result = date.format('ZZ');
          break;
        case 12:
          result = date.format('X');
          break;
        default:
          break;
      }
    } else {
      result = date.format(buildInput);
    }

    if (result === 'Invalid date') {
      return console.log(
        'Invalid Date! Check that your date is valid in "Store Date Info Plus". A Date generally looks like the one stored in "Creation Date" of a server. (variables works)',
      );
    }

    if (result !== undefined) {
      const storage = parseInt(data.storage, 10);
      const varName = this.evalMessage(data.varName, cache);
      this.storeValue(result, storage, varName, cache);
    }

    this.callNextAction(cache);
  },

  mod() {},
};
