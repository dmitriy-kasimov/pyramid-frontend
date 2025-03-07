/*
	напицсать функцию банкомата, чутка хардовее предыдущей
*/
const limits = {
	5000: 5,
	1000: 8,
	500: 10,
	100: 3,
	// 23: 13,
	// 543: 1,
	// 3: 5
}

// atm(15600, limits) => {5000: 3, 500: 1, 100: 1} + мутировать limits

function atm(sum, lim) {
	if(sum <= 0)return null
	
	const mapLimits = new Map(Object.entries(lim).sort((a,b) => b[0]-a[0]))
	const result = {}
	let copySum = sum
	for(const [nominal, count] of mapLimits){
		if(nominal > copySum)continue
		if(copySum === 0) break
		const maxCountBanknots = Math.floor(copySum/nominal)
		const maxCountBanknotsInLim = mapLimits.get(nominal) 
		const minCount = Math.min(maxCountBanknotsInLim, maxCountBanknots)
		result[nominal] = minCount
		copySum -= minCount*nominal
	}
	if(copySum === 0)
	{
		for(const [nominal, _] of Object.entries(result)){
			limits[nominal] -= result[nominal]
		}
		return result
	}
	return null
}

console.log(atm(1600, limits))
console.log(limits)




/*
	напицсать функцию банкомата
*/
// const limits = {
// 	5000: 5,
// 	1000: 8,
// 	500: 10,
// 	100: 3,
// }

// atm(15600, limits) => {5000: 3, 500: 1, 100: 1}

// function atm(sum, limits) {
// 	if(sum <= 0)return null
// 	const mapLimits = new Map(Object.entries(limits).sort((a,b) => b[0] - a[0]))
//
// 	const result={}
// 	let copySum = sum;
//
// 	for(const [nominal, count] of mapLimits){
// 		if(copySum === 0) break;
// 		if(nominal > copySum) continue;
// 		const countForThisNominal = Math.floor(copySum/nominal)
// 		if(countForThisNominal <= mapLimits.get(nominal)){
// 			result[nominal] = countForThisNominal
// 			copySum -= countForThisNominal * nominal
// 		} else {
// 			result[nominal] = mapLimits.get(nominal)
// 			copySum -= mapLimits.get(nominal) * nominal
// 		}
//
// 	}
// 	if(copySum !== 0)return null
// 	return result
// }
//
// console.log(atm(400, limits))