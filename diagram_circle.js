function circle(data) {
    const canvas = createCanvas(500, 500);
    const ctx = canvas.getContext('2d');

    // фон
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, 500, 500)

    // список цветов диаграммы
    const colors = ['red', 'green', 'blue', 'yellow', 'orange']
    const text = "Круговая диаграмма"; 

    // вычисляем сумму всех данных
    let total = 0
    for (let i = 0; i < data.length; i++) {
        total += Number(data[i])
    }

    // рисуем круговые данные
    let prevAngle = 0; 
    for(var i=0; i<data.length; i++) { 
        // доля, представленная сегментом
        const fraction = data[i]/total; 
        // вычисляем начальный угол
        const angle = prevAngle + fraction*Math.PI*2; 
        
        // рисуем сегмент
        ctx.fillStyle = colors[i]; 
        
        // создаём контур
        ctx.beginPath(); 
        ctx.moveTo(250,250); 
        ctx.arc(250,250, 100, prevAngle, angle, false); 
        ctx.lineTo(250,250); 
        
        // заливаем его
        ctx.fill(); 
        
        // обводим его
        ctx.strokeStyle = "black"; 
        ctx.stroke(); 
        
        // обновляем для следующей итерации цикла
        prevAngle = angle; 
    }

    // рисуем текст по центру
    ctx.fillStyle = "black"; 
    ctx.font = "24pt sans-serif"; 
    const metrics = ctx.measureText(text); 
    ctx.fillText(text, 250-metrics.width/2, 400); 

    // сохраняем диаграмму в файл чтобы отправить ее потом
    const out = fs.createWriteStream('./test.png');
    const stream = canvas.createPNGStream();

    stream.pipe(out);
}