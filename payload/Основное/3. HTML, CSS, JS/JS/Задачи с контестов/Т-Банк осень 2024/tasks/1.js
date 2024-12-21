
const repairSet = (set) => {
	let result= "";

	for( const item of set.split(',') ){
		if( !item.includes('-') ){
			result += ` ${item}`
		} else {
			const [from, to] = item.split('-').map(value => Number(value))
			for( let i = from; i <= to; i++ ){
				result += ` ${i}`
			}
		}
	}

	return result
}


console.log(repairSet('1-6,8-9,11'))
console.log(repairSet('1-6,8-9,11-12'))
console.log(repairSet('1-6,8-9,11-12,13-17'))

// const repairSet = (set) => {
// 	const result=[];
// 	const slices = set.split(',')
// 	for(const item of slices){
// 		if( !item.includes('-') )
// 			result.push(Number(item));
// 			const [from, to] = item.split('-')
// 			for(let i = Number(from); i <= Number(to); i++) {
// 				result.push(i);
// 			}
// 	}
// 	return result.join(' ')
// }
//
// console.log(repairSet('1-6,8-9,11'))
// console.log(repairSet('1-6,8-9,11-12'))
// console.log(repairSet('1-6,8-9,11-12,13-17'))