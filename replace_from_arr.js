// Строка которую надо изменить
// String that we need to change
let str = 'Cities of Russia: Moscow, Saint-Petersburg, Novosibirsk' 

// Массив с элементами, которые мы заменяем
// Array with elements that we need to change
const cities = [ 
    "Yekaterinburg", 
    "Samara", 
    "Moscow", 
    "Saint-Petersburg", 
    "Krasnodar", 
    "Yaroslavl", 
    "Kazan", 
    "Chelyabinsk", 
    "Omsk", 
    "Rostov on Don",
    "Ufa", 
    "Volgograd"
]

// Создаем regexp: /(элемент1|элемент2|и тд)/g
// creating regexp /(element1|element2|etc)/g
let re = new RegExp('('+cities.join('|')+')', 'g')

console.log(str.replace(re, '***'))
// Output:
// Cities of Russia: ***, ***, Novosibirsk
