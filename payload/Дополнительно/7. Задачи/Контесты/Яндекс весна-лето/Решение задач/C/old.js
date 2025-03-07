function searchRecord(records, recordId){
    let from = 0;
    let to = records.length - 1;
    console.log(`Start finding the record with id ${recordId}...`);
    do{
        let middle = Math.floor((from+to)/2)
        console.log(`Current record with id ${middle}`);
        const current = records[middle].id
        if(recordId < current)
            to = middle - 1
        else if(recordId > current)
            from = middle + 1
        else {
            console.log(`Record with id ${recordId} was founded!`);
            return records[middle]
        }

    }while(from <= to)
    throw new Error(`Запись не найдена, id: ${recordId}`)
}

function getRecord(url, recordId){
    return new Promise(async (resolve) => {
        try{
            const response = await fetch(url)
            if(response.ok){
                const records = await response.json()
                const record = searchRecord(records, recordId)
                resolve({
                    ...record,
                    getTitle: () => this.title,
                    getSummary: () => this.summary,
                    getDetails: () => this.details,
                })
            }
        } catch (err){
            console.log(err)
            //throw new Error(`Неожиданный формат данных: ${url}`)
        }
    })
}

const url = 'https://jsonplaceholder.typicode.com/posts';
getRecord(url, 101).then(console.log)
//module.exports = getRecord;