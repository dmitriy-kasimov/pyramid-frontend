function sequenceIsTrue(sequence, rules){
    for(const rule of rules){
        const [a,b] = rule
        if(!sequence.includes(a) || !sequence.includes(b))
            continue

        if(sequence.findIndex(item => item === a) > sequence.findIndex(item => item === b))
            return false
    }
    return true
}

function solution(input){
    const [inputRules, inputSequences] = input.split('\n\n')
    const rules = inputRules.split('\n').map(rule => rule.split('|'))

    const sequences = inputSequences.split('\n').map(sequence => sequence.split(', '))

    let result = 0;
    for(const sequence of sequences)
        sequenceIsTrue(sequence, rules) && ++result
    
    return result
}

const input =
`28|12
5|9
9|2

10, 5, 15, 28, 9, 12
2, 7, 12, 5, 9
4, 8, 16, 32, 64`

const result = solution(input)
console.log(result)