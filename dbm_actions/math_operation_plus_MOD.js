module.exports = {
  name: 'Math Operation Plus',
  section: 'Other Stuff',
  meta: {
    version: '2.1.5',
    preciseCheck: false,
    author: 'DBM Mods',
    authorUrl: 'https://github.com/dbm-network/mods',
    downloadURL: 'https://github.com/dbm-network/mods/blob/master/actions/math_operation_plus_MOD.js',
  },

  subtitle(data) {
    const info = [
      'Сложение',
      'Вычитание',
      'Умножение',
      'Деление',
      'Округление',
      'Округление до S.F.',
      'Absolute',
      'Ceil',
      'Floor',
      'Факториал',
      'Raised by (Exponents)',
      'Rooted by (Roots)',
      'Синус',
      'Косинус',
      'тангенс',
      'Арксинус',
      'Арккосинус',
      'Арктангенс',
      '% от числа',
      'Увеличить на %',
      'Уменьшить на %',
      'Значение Pi',
      "Значение числа Эйлера",
    ];
    const operation = [
      '+',
      '-',
      '*',
      '/',
      '---',
      '---',
      '---',
      '---',
      '---',
      '---',
      '---',
      '---',
      '---',
      '---',
      '---',
      '---',
      '---',
      '---',
      '%',
      '+%',
      '-%',
      '---',
      '---',

    ];
    return `${data.FirstNumber} ${operation[data.info]} ${data.SecondNumber} (${info[data.info]})`;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName, 'Number'];
  },

  fields: ['FirstNumber', 'info', 'SecondNumber', 'storage', 'varName'],

  html(_isEvent, data) {
    return `
<div id="FirstNum" style="width: 90%;">
  <span class="dbminputlabel">Первое число</span><br>
  <input id="FirstNumber" class="round" type="text">
</div><br>
<div style="padding-top: 8px; width: 60%;">
<span class="dbminputlabel">Операция</span>
  <select id="info" class="round" onchange="glob.onChange1(this)">
      <option value="0" selected>Сложение</option>
      <option value="1">Вычитание</option>
      <option value="2">Умножение</option>
      <option value="3">Деление</option>
      <option value="4">Округление</option>
      <option value="5">Округление до S.F.</option>
      <option value="6">Absolute</option>
      <option value="7">Ceil</option>
      <option value="8">Floor</option>
      <option value="9">Факториал</option>
      <option value="10">Raised by (Exponents)</option>
      <option value="11">Rooted by (Roots)</option>
      <option value="12">Синус</option>
      <option value="13">Косинус</option>
      <option value="14">Тангенс</option>
      <option value="15">Арксинус</option>
      <option value="16">Арккосинус</option>
      <option value="17">Арктангенс</option>
      <option value="18">% от числа</option>
      <option value="19">Увеличить на %</option>
      <option value="20">Уменьшить на %</option>
      <option value="21">Значение Pi</option>
      <option value="22">Значение числа Эйлера</option>
  </select>
</div><br>
<div id="SecondNum" style="width: 90%;">
<span class="dbminputlabel">Второе число</span><br>
  <input id="SecondNumber" class="round" type="text">
</div><br>
<div style="padding-top: 8px;">
  <div style="float: left; width: 35%;">
  <span class="dbminputlabel">Сохранить в</span><br>
    <select id="storage" class="round">
      ${data.variables[1]}
    </select>
  </div>
  <div id="varNameContainer" style="float: right; width: 60%;">
  <span class="dbminputlabel">Название переменной</span><br>
    <input id="varName" class="round" type="text">
  </div>
</div>`;
  },

  init() {
    const { glob, document } = this;

    glob.onChange1 = function onChange1(event) {
      const value = parseInt(event.value, 10);
      const dom = document.getElementById('SecondNum');
      const dom2 = document.getElementById('FirstNum');

      if ((value >= 0 && value <= 3) || [5, 10, 11].includes(value) || (value >= 18 && value <= 20)) {
        dom.style.display = null;
      } else {
        dom.style.display = 'none';
      }

      if (value < 21) {
        dom2.style.display = null;
      } else {
        dom2.style.display = 'none';
      }
    };
    glob.onChange1(document.getElementById('info'));
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    let FN = parseFloat(this.evalMessage(data.FirstNumber, cache).replace(/,/g, ''));
    const SN = parseFloat(this.evalMessage(data.SecondNumber, cache).replace(/,/g, ''));
    const info = parseInt(data.info, 10);

    let result;
    switch (info) {
      case 0:
        result = FN + SN;
        break;
      case 1:
        result = FN - SN;
        break;
      case 2:
        result = FN * SN;
        break;
      case 3:
        result = FN / SN;
        break;
      case 4:
        result = Math.round(FN);
        break;
      case 5:
        result = FN.toPrecision(SN);
        break;
      case 6:
        result = Math.abs(FN);
        break;
      case 7:
        result = Math.ceil(FN);
        break;
      case 8:
        result = Math.floor(FN);
        break;
      case 9:
        if (FN === 0) {
          result = 1;
        }
        if (FN < 0) {
          result = undefined;
        }
        for (let i = FN; --i; ) {
          FN *= i;
        }
        result = FN;
        break;
      case 10:
        result = Math.pow(FN, SN);
        break;
      case 11:
        result = Math.pow(FN, 1 / SN);
        break;
      case 12:
        result = Math.sin(FN);
        break;
      case 13:
        result = Math.cos(FN);
        break;
      case 14:
        result = Math.tan(FN);
        break;
      case 15:
        result = Math.asin(FN);
        break;
      case 16:
        result = Math.acos(FN);
        break;
      case 17:
        result = Math.atan(FN);
        break;
      case 18:
        result = (FN * SN) / 100;
        break;
      case 19:
        result = (FN * SN) / 100 + FN;
        break;
      case 20:
        result = (FN * (100 - SN)) / 100;
        break;
      case 21:
        result = Math.PI;
        break;
      case 22:
        result = Math.E;
        break;
      default:
        break;
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
