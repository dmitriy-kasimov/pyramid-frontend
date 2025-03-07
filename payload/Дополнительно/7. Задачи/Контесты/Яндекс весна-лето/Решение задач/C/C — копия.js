/*
	interface IRecord {
		id: number
		title: string
		summary: string
		details: string
	}
	function searchRecord(records: IRecord[], recordId: number): IRecord | null
*/
function searchRecord(records, recordId){
	if(!records.length)return null
	let from = 0;
	let to = records.length-1;
	do {
		let middle = Math.floor((from + to)/2)
		const current = records[middle].id
		if(recordId < current)
			to = middle - 1
		else if(recordId > current)
			from middle + 1
		else 
			return records[middle]
	}
	return null
}

//function recordsIsCorrect(records: IRecord[]): boolean
function recordsIsCorrect(records){
	if(!Array.isArray(records))return false;
	records.forEach(record => {
		if(typeof(record.id) !== 'number')return false
		else if(typeof(record.title) !== 'string')return false
		else if(typeof(record.summary) !== 'string')return false
		else if(typeof(record.details) !== 'string')return false
	})
	return true
}

/*
	interface IExtendedRecord extends IRecord {
		getTitle: () => string
		getSummary: () => string
		getDetails: () => string
	}
	function getRecord(url: string, recordId: number): Promise<TRecord>
*/
function getRecord(url, recordId){
	return new Promise(async (resolve) => {
		const response = await fetch(url)
		if(response.ok){
			const records = await response.json()
			const isCorrect = recordsIsCorrect(records)
			if(!isCorrect)
				throw new Error(`Неожиданный формат данных: ${url}`)
			const foundedRecord = searchRecord(records, recordId)
			if(!foundedRecord)
				throw new Error(`Запись не найдена, id: ${recordId}`)
			const resultRecord = {
				...foundedRecord,
				getTitle: () => this.title
				getSummary: () => this.summary
				getDetails: () => this.details
			}
			resolve(resultRecord)
			
		} else {
			throw new Error(`Неожиданный формат данных: ${url}`)
		}
	})
}


//module.exports = getRecord;