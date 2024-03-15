// Строка которую надо изменить
let str = 'Города России: Москва, Питер, Новосибирск' 

// Массив с элементами, которые мы заменяем
const cities = [ 
    "Новосибирск", 
    "Екатеринбург", 
    "Самара", 
    "Москва", 
    "Санкт-Петербург", 
    "Краснодар", 
    "Ярославль", 
    "Казань", 
    "Челябинск", 
    "Омск", 
    "Ростов на Дону",
    "Уфа", 
    "Нижний Новгород", 
    "Волгоград"
]

// Создаем regexp: /(элемент1|элемент2|и тд)/g
let re = new RegExp('('+cities.join('|')+')', 'g')

console.log(str.replace(re, 'тест'))
