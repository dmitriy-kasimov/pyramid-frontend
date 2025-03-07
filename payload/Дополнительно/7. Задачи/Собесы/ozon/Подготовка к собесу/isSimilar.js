
/*способ 1*/
function isSimilar(arr1, arr2){
	if(arr1.length !== arr2.length)return false;
	
	arr1.sort((a, b) => a-b) //N * logN
	arr2.sort((a, b) => a-b) //N * logN
	
	//N
	for(let i = 0; i<arr1.length;i++){
		if(arr1[i] !== arr2[i])return false
	}
	
	// O(2N*logN + N)
	return true
}

/*способ 2*/
function isSimilar(arr1, arr2){
	if(arr1.length !== arr2.length)return false;

	const mapArr1 = new Map();
	for(const item of arr1){ // N
		mapArr1.has(item) ? mapArr1.set(item, mapArr1.get(item)+1) : mapArr1.set(item, 1)
	}
	
	const mapArr2 = new Map();
	for(const item of arr2){ // N
		mapArr2.has(item) ? mapArr2.set(item, mapArr2.get(item)+1) : mapArr2.set(item, 1)
	}
	console.log(mapArr1)
	console.log(mapArr2)
	for(const [key, value] of mapArr1){// N
		if(!mapArr2.has(key))return false
		else if (mapArr2.get(key) !== value)return false
	}
	
	// O (3N) ~ O(N)
	return true
}

console.log(isSimilar([0, 1], [0,1,2]))
console.log(isSimilar([0, 2, 1], [0,1,2]))
console.log(isSimilar([1, 2, 1], [2,1,1]))


/*
const tickets = [
	{from: 'Пятигорск', to: 'Краснодар'},
	{from: 'Краснодар', to: 'Москва'},
	{from: 'Москва', to: 'Калининград'},
	{from: 'Калининград', to: 'Челябинск'},
	{from: 'Челябинск', to: 'Астана'},
]
*/
const tickets = [
	{from: 'Челябинск', to: 'Астана'},
	{from: 'Пятигорск', to: 'Краснодар'},
	{from: 'Калининград', to: 'Челябинск'},
	{from: 'Москва', to: 'Калининград'},
	{from: 'Краснодар', to: 'Москва'},
]



// по памятика - никак не ограничены
// сложность должны быть не выше O(N)
const sortTickets = (tickets) => {
	const result=[];

	const length = tickets.length
	for(let i = 0; i < tickets.length;i++){
		if(!result.length){
			const visited = tickets.splice(i, 1)
			result.push(visited)
		}
		else if( result[0].from === tickets[i].to ){
			const visited = tickets.splice(i, 1)
			result.unshift(visited)
		} else if(result[result.length-1].to === tickets[i].from ){
			const visited = tickets.splice(i, 1)
			result.push(visited)
		}
	}

	return result;
}

console.log(sortTickets(tickets))