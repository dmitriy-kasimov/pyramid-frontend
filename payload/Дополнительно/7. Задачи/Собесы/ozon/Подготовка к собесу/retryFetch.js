/*
	Расширить нативный fetch следующим образом:
	- tryCount: указывать количество попыток
	- timeout (ms): максимальное время, за которое должен выполниться запрос
*/

function retryFetch(url, {tryCount, timeout}){
	return new Promise(async (resolve, reject) => {
		let reason = null;
		const controller = new AbortController()
		for (let i = 0; i < tryCount; i++){
			const timer = setTimeout(() => controller.abort(), timeout)

			try{
				const response = await fetch(url, { signal: controller.signal })
				if(response.ok){
					const result = await response.json()
					resolve(result)
					break
				}
			} catch (err) {
				reason = err.name
			} finally {
				clearTimeout(timer)
			}

		}
		reject(reason ? reason : `count tries is over :(`)
	})
}

retryFetch('https://jsonplaceholder.typicode.com/posts', {tryCount: 3, timeout: 1000})
	.then(console.log)
	.catch(console.log)




/*

	Задача №3. Написать функцию, которая делает запрос на сервер tryCount раз до тех пор, 
	пока не будет получен успешный ответ. 

*/

/*function retryFetch(url, tryCount){
	return new Promise(async (resolve, reject) => {
		for(let i = 0; i < tryCount; i++){
			const response = await fetch(url)
			if(response.ok){
				const result = await response.json()
				resolve(result)
			}
		}
		reject(`count tries is over :(`)
	})
}

retryFetch('https://jsonplaceholder.typicode.com/posts', 3)
	.then(res => console.log(`success: ${res}`))
	.catch(err => console.log(`error: ${err}`))*/