// data - массив с числами
function diag(data) {
    const width = data.length * 100 + 10
    const height = 550
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, width, height)
    
    ctx.fillStyle = "blue"
    for (let i = 0; i < data.length; i++) {
        const len = data[i]
        ctx.fillText(len, 50 + i*100, height-50-len*5) // рисуем значения столбиков
        ctx.fillRect(40 + i*100, height-40-len*5, 30, len*5) // рисуем столбики
    }

    // рисуем границы диаграммы 
    ctx.fillStyle = "black"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(30, 10)
    ctx.lineTo(30, height-40)
    ctx.lineTo(width - 30, height-40)
    ctx.stroke()

    // рисуем числа и метки (от 0 до 90)
    for (let j = 0; j < 11; j++) {
        ctx.fillText((10-j)*10, 5, j*50+12)
        ctx.beginPath()
        ctx.moveTo(25, j*50+10)
        ctx.lineTo(30, j*50+10)
        ctx.stroke()
    }

    // рисуем названия снизу (рисуется столько, сколько чисел в массиве data)
    const labels = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    for (let g = 0; g < data.length; g++) {
        ctx.fillText(labels[g], 40 + g*100, height-25)
    }

    // сохраняем диаграмму в файл чтобы отправить ее потом
    const out = fs.createWriteStream('./test.png');
    const stream = canvas.createPNGStream();

    stream.pipe(out);
}
