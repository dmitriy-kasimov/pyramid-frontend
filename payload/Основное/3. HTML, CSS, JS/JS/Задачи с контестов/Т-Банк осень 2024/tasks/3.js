//const getPassword = (history: string, setChars; string, maxLength: number): string => {
const getPassword = (history, setChars, maxLength) => {
    if(maxLength < setChars.length) return -1

    for( let i = history.length; i >= setChars.length; i-- ) {
        const slice = history.slice(i - setChars.length, i);
        if( [...setChars].every(char => slice.includes(char)) ) {
            if(slice.length === maxLength) return slice
            return slice.concat(history.slice(i, i + maxLength - slice.length))
        }
    }

    return -1
}

// console.log(getPassword('abacaba', 'abc', 4))
console.log(getPassword('abacaba', 'abc', 3))
//
// console.log(getPassword('abacdcaba', 'abcd', 5))
//console.log(getPassword('abacdcabaacdb', 'abcd', 6))
