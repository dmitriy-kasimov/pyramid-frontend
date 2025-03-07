/*
Задача №1.  Написать функцию «encode», которая преобразует указанную входную последовательность в указанную выходную последовательность.
Пример входных данных: AABBBGGHKKK, функция «encode» возвращает: 2A3B2GH3K.
*/

// через map
function encode(code){
	if(code === '')
		return '';

	const map = new Map()

	for(const letter of code){
		map.has(letter) ? map.set(letter, map.get(letter)+1) : map.set(letter, 1)
	}

	const result=[]
	for(const [key, value] of map){
		result.push(value === 1 ? `${key}` : `${value}${key}` )
	}

	return result.join('')
}

//console.log(encode('AABBBGGHKKK'))

// в стиле C
function encode2(code){
	if(code === '')
		return ''

	const result= [];

	let currentChar = null
	let count = 0

	for(const letter of code){
		if(!currentChar){
			currentChar = letter
			count++;
		} else if (letter !== currentChar){
			result.push(count === 1 ? `${currentChar}` : `${count}${currentChar}`)
			currentChar = letter
			count = 1
		} else if(letter === currentChar){
			count++
		}
	}
	result.push(count === 1 ? `${currentChar}` : `${count}${currentChar}`)

	return result.join('')
}
console.log(encode2('abcdefg'))