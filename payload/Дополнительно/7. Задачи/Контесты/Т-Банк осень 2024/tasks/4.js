function isSimpleNumber(num) {
    for (let i = 2; i < num; i++) {
        if (num % i === 0) return false;
    }
    return num !== 1;
}

const generateSimpleNumbers = (limit) => {
    const result=[];

    for( let i = 2; i <= limit; i++){
        if(isSimpleNumber(i)){
            result.push(i)
        }
    }

    return result
}

const getCountDividers = (num) => {
    let count = 1;

    for(let i = 2; i <= num; i++){
        if(num % i === 0){
            count++;
        }
    }

    return count;
}


const getAnswer = (l, r) => {

    const simpleNumbers = generateSimpleNumbers(r);

    let result= 0;
    for(let i = l; i <= r; i++){
        const isNotSimpleNum = !simpleNumbers.includes(i);

        if( isNotSimpleNum && simpleNumbers.includes(getCountDividers(i)) ){
            result++;
        }
    }

    return result
}

console.log(getAnswer(1, 9));
console.log(getAnswer(3, 6));
console.log(getAnswer(6, 9));