/*

	Задача №4 Написать функцию, которая будет осуществлять поиск объекта 
	с максимальным значением переданного параметра и возвращать соответствующий объект.

*/

const arr = [
	{id: 0, count: 5, value: 6},
	{id: 1, count: 1, value: 9},
	{id: 2, count: undefined, value: 1},
]

//function findMax<T>(arr: T[], field: keyof T): T | null{
function findMax(arr, field){
	let max = null
	
	for(const item of arr){
		if(field in item && item[field]){
			if(!max)max = item
			else {
				if(item[field] > max[field]){
					max = item
				}
			}
		}
	}
	
	return max
}

console.log(findMax(arr, 'id'))